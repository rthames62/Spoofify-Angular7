import { Component, OnInit } from '@angular/core';
import { NowPlayingService, NowPlaying } from '../shared/services/now-playing.service';
import { convertSecondsToMinutes } from "../shared/core/utils";
import { Observable, timer } from 'rxjs';
import { skipWhile, filter, takeUntil } from 'rxjs/operators';

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
  currentlyPlayingProgressSeconds;
  currentlyPlayingProgress;
  currentlyPlayingProgress$: Observable<any>;
  currentlyPlayingIndex: number;

  constructor(private nowPlayingService: NowPlayingService) { }

  ngOnInit() {
    this.currentlyPlayingDurationDisplay = convertSecondsToMinutes(0);
    this.currentlyPlayingProgress = convertSecondsToMinutes(0);
    this.nowPlayingService.nowPlaying$.subscribe((nowPlaying: NowPlaying) => {
      this.nowPlaying = nowPlaying;
      this.nowPlaying.trackList.forEach((track, index) => {
        if(this.nowPlaying.track.id === track.id) {
          this.currentlyPlayingIndex = index;
        }
      })
      this.currentlyPlayingDurationSeconds = 0;
      this.currentlyPlayingProgressSeconds = 0;


      if(this.currentlyPlayingTrack) {
        this.currentlyPlayingTrack.pause();
      }

      if(nowPlaying.track.preview_url) {
        this.nowPlayingService.currentlyPlaying.next(true);
        this.currentlyPlayingTrack = new Audio(nowPlaying.track.preview_url);
        setTimeout(() => {
          this.currentlyPlayingTrack.play();
          this.currentlyPlayingDurationDisplay = convertSecondsToMinutes(this.currentlyPlayingTrack.duration);
          this.currentlyPlayingProgressSeconds = 0;
          this.currentlyPlayingDurationSeconds = Math.floor(this.currentlyPlayingTrack.duration);
          this.currentlyPlayingProgress$ = timer(this.currentlyPlayingTrack.duration, 1000).pipe(
            filter(val => {
              return this.currentlyPlayingFlag && this.currentlyPlayingDurationSeconds > 0;
            })
          )
          this.currentlyPlayingProgress$.subscribe(e => {
            this.currentlyPlayingProgressSeconds++;
            this.currentlyPlayingDurationSeconds--;
            this.currentlyPlayingProgress = convertSecondsToMinutes(this.currentlyPlayingProgressSeconds);
            this.currentlyPlayingDurationDisplay = convertSecondsToMinutes(this.currentlyPlayingDurationSeconds);
            if(this.currentlyPlayingDurationSeconds === 0) {
              this.nowPlaying.track = this.nowPlaying.trackList[1];
              this.playNext();
            }
          })
        }, 200);
      }
    });
    this.nowPlayingService.currentlyPlaying$.subscribe(bool => this.currentlyPlayingFlag = bool);
  }

  pause(): void {
    this.currentlyPlayingTrack.pause();
    this.nowPlayingService.currentlyPlaying.next(false);
  }

  play(): void {
    if(this.currentlyPlayingTrack) {
      this.currentlyPlayingTrack.play();
      this.nowPlayingService.currentlyPlaying.next(true);
    }
  }

  playNext(): void {
    if(this.currentlyPlayingIndex < this.nowPlaying.trackList.length - 1) {
      this.nowPlayingService.updateNowPlaying(this.nowPlaying.trackList[this.currentlyPlayingIndex + 1], this.nowPlaying.trackList);
    }
  }

  playPrevious(): void {
    if(this.currentlyPlayingIndex > 0) {
      this.nowPlayingService.updateNowPlaying(this.nowPlaying.trackList[this.currentlyPlayingIndex - 1], this.nowPlaying.trackList);
    }
  }
}
