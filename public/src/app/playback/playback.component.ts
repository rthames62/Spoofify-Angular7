import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NowPlayingService, NowPlaying } from '../shared/services/now-playing.service';
import { convertSecondsToMinutes } from "../shared/core/utils";
import { Observable, timer, of, BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { skipWhile, filter, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'sc-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent implements OnInit {

  @ViewChild('volumeHandle') volumeHandle;
  nowPlaying: NowPlaying;
  currentlyPlayingTrack;
  currentlyPlayingFlag: boolean = false;
  currentlyPlayingDurationSeconds: number = 0;
  currentlyPlayingDurationDisplay;
  currentlyPlayingProgressSeconds: number = 0;
  currentlyPlayingProgress;
  currentlyPlayingProgress$: Observable<any>;
  currentlyPlayingIndex: number;
  destroyTimer: Subject<boolean> = new Subject<boolean>();
  destroyTimer$: Observable<any> = this.destroyTimer.asObservable();
  progressBarTime: number;
  nextSongTransition: boolean = false;
  _volume: number = 140;
  volume: number = 140;
  volumeBeforeMute: number;
  muted: boolean = false;
  mouseDown: boolean = false;
  mouseMove$: Observable<any> = fromEvent(window, 'mousemove').pipe(filter(e => this.mouseDown));
  startingX: number;
  shuffleOn: boolean = false;
  repeatOn: boolean = false;

  constructor(private nowPlayingService: NowPlayingService) { }

  ngOnInit() {
    this.currentlyPlayingDurationDisplay = convertSecondsToMinutes(0);
    this.currentlyPlayingProgress = convertSecondsToMinutes(0);

    this.nowPlayingService.nowPlaying$.subscribe((nowPlaying: NowPlaying) => {
      this.currentlyPlayingDurationSeconds = 0;
      this.currentlyPlayingProgressSeconds = 0;
      this.resetProgressBar();

      if(nowPlaying.trackList) {
        this.destroyTimer.next(true);
        this.nowPlaying = nowPlaying;      
        setTimeout(() => {
          const playingDuration = this.nowPlayingService.getPlayingDuration();
          this.currentlyPlayingTrack = nowPlaying.track;
          this.currentlyPlayingDurationDisplay = convertSecondsToMinutes(playingDuration);
          this.currentlyPlayingDurationSeconds = Math.floor(playingDuration);
          this.initTimer();
        }, 500);
        
      }
    });
    this.nowPlayingService.currentlyPlaying$.subscribe(bool => {
      this.currentlyPlayingFlag = bool;
      if(!bool) {
        this.destroyTimer.next(true);
      }
      if(this.nowPlaying && bool) {
        this.initTimer();
      }
    });

    fromEvent(this.volumeHandle.nativeElement, 'mousedown').subscribe((e: any) => {
      this.startingX = e.pageX;
      this.mouseDown = true;
    });
    fromEvent(window, 'mouseup').subscribe(e => {
      this.mouseDown = false;
    })
    this.mouseMove$.subscribe(e => {
      const move = e.x - this.startingX;
      if(this.volume <= this._volume && this.volume >= 0) {
        this.volume += move;
        this.setVolume();

        if(this.volume > this._volume) {
          this.volume = this._volume;
        } else if(this.volume < 0) {
          this.volume = 0;
        }
      } 
      this.startingX = e.x;
    });
    this.nowPlayingService.shuffleOn$.subscribe(val => this.shuffleOn = val);
    this.nowPlayingService.repeatOn$.subscribe(val => {
      this.repeatOn = val;
      console.log(val);
    });
  }

  pause(): void {
    this.nowPlayingService.pause();
  }

  play(): void {
    this.nowPlayingService.play();
  }

  playNext(): void {
    this.nowPlayingService.playNext();
  }

  playPrevious(): void {
    this.nowPlayingService.playPrevious();
  }

  setTimers(): void {
    
  }

  initTimer(): void {
    const playingDuration = this.nowPlayingService.getPlayingDuration();
    this.currentlyPlayingProgress$ = timer(playingDuration, 50).pipe(
      takeUntil(this.destroyTimer$)
    )
    
    this.currentlyPlayingProgress$.subscribe(e => {
      const currentTime = this.nowPlayingService.getPlayingCurrentTime();
      this.progressBarTime = (currentTime / playingDuration) * 100;
      this.currentlyPlayingProgressSeconds = Math.floor(currentTime);
      this.currentlyPlayingDurationSeconds = playingDuration - Math.floor(currentTime);
      this.currentlyPlayingProgress = convertSecondsToMinutes(this.currentlyPlayingProgressSeconds);
      this.currentlyPlayingDurationDisplay = convertSecondsToMinutes(this.currentlyPlayingDurationSeconds);
      if(Math.floor(this.currentlyPlayingDurationSeconds) === 0) {
        this.resetProgressBar();
        this.nowPlayingService.playNext('auto');
      }
    })
  }

  resetProgressBar(): void {
    this.progressBarTime = 0;
  }

  changeVolume(e): void {
    const wrapper = e.path.filter(el => el.id === 'slider-wrapper')[0];
    this.volume = e.clientX - wrapper.offsetLeft + 5;
    this.setVolume();
  }

  toggleVolume(): void {
    if(this.muted) {
      this.muted = false;
      this.volume = this.volumeBeforeMute;
    } else {
      this.muted = true;
      this.volumeBeforeMute = this.volume;
      this.volume = 0;
    }
    this.setVolume();
  }

  toggleShuffle(): void {
    this.nowPlayingService.shuffleOn.next(!this.nowPlayingService.shuffleOn.getValue());
  }

  toggleRepeat(): void {
    this.nowPlayingService.repeatOn.next(!this.nowPlayingService.repeatOn.getValue());
  }

  private setVolume(): void {
    this.nowPlayingService.setVolume(this.volume / this._volume);
  }
}
