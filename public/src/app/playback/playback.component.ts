import { Component, OnInit } from '@angular/core';
import { NowPlayingService, NowPlaying } from '../shared/services/now-playing.service';
import { convertSecondsToMinutes } from "../shared/core/utils";
import { Observable, timer, of, BehaviorSubject, Subject } from 'rxjs';
import { skipWhile, filter, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'sc-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent implements OnInit {

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
          this.currentlyPlayingDurationDisplay = convertSecondsToMinutes(playingDuration);
          this.currentlyPlayingDurationSeconds = Math.floor(playingDuration);
          console.log(this.currentlyPlayingDurationDisplay, this.currentlyPlayingDurationSeconds);
          this.initTimer();
        }, 200);
        
      }
    });
    this.nowPlayingService.currentlyPlaying$.subscribe(bool => {
      this.currentlyPlayingFlag = bool;
      console.log(bool);
      if(!bool) {
        this.destroyTimer.next(true);
      }
      if(this.nowPlaying && bool) {
        this.initTimer();
      }
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
    this.currentlyPlayingProgress$ = timer(playingDuration, 1000).pipe(
      takeUntil(this.destroyTimer$)
    )
    
    this.currentlyPlayingProgress$.subscribe(e => {
      this.progressBarTime = (this.currentlyPlayingProgressSeconds === 0 ? 1 : this.currentlyPlayingProgressSeconds) / (playingDuration - 2);
      this.currentlyPlayingProgressSeconds++;
      this.currentlyPlayingDurationSeconds--;
      this.currentlyPlayingProgress = convertSecondsToMinutes(this.currentlyPlayingProgressSeconds);
      this.currentlyPlayingDurationDisplay = convertSecondsToMinutes(this.currentlyPlayingDurationSeconds);
      if(this.currentlyPlayingDurationSeconds === 0) {
        this.resetProgressBar();
        this.nowPlayingService.playNext();
      }
    })
  }

  resetProgressBar(): void {
    this.nextSongTransition = true;
    this.progressBarTime = 0;
    setTimeout(() => this.nextSongTransition = false, 50);
  }
}
