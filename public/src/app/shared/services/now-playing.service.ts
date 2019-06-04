import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Track } from '../types/spotify-types';

export interface NowPlaying {
  track?: Track,
  trackList?: Track[]
}

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService {

  nowPlaying: BehaviorSubject<NowPlaying> = new BehaviorSubject<NowPlaying>({});
  nowPlaying$: Observable<any> = this.nowPlaying.asObservable();
  currentlyPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentlyPlaying$: Observable<any> = this.currentlyPlaying.asObservable();

  currentlyPlayingTrack;
  currentlyPlayingFlag: boolean = false;
  currentlyPlayingDurationSeconds: number = 0;
  currentlyPlayingDurationDisplay;
  currentlyPlayingProgressSeconds;
  currentlyPlayingProgress;
  currentlyPlayingProgress$: Observable<any>;
  currentlyPlayingIndex: number;

  constructor() { }

  updateNowPlaying(track: Track, trackList?: Track[]): void {
    if(track.preview_url) {
      this.initTrackAudio(track.preview_url);
      trackList.forEach((x, index) => {
        if(x.id === track.id) {
          this.currentlyPlayingIndex = index;
        }
      })
      this.nowPlaying.next({ track: track, trackList: trackList });
    }
  }

  play(): void {
    if(this.currentlyPlayingTrack) {
      this.currentlyPlayingTrack.play();
      this.currentlyPlaying.next(true);
    }
  }

  pause(): void {
    this.currentlyPlayingTrack.pause();
    this.currentlyPlaying.next(false);
  }

  playNext(): void {
    const trackList = this.nowPlaying.getValue().trackList;
    if(this.currentlyPlayingIndex < trackList.length - 1) {
      this.updateNowPlaying(trackList[this.currentlyPlayingIndex + 1], trackList);
    }
  }

  playPrevious(): void {
    const trackList = this.nowPlaying.getValue().trackList;
    if(this.currentlyPlayingIndex > 0) {
      this.updateNowPlaying(trackList[this.currentlyPlayingIndex - 1], trackList);
    }
  }

  setPlayingIndex(): void {
    this.nowPlaying.getValue().trackList.forEach((track, index) => {
      if(this.nowPlaying.getValue().track.id === track.id) {
        this.currentlyPlayingIndex = index;
      }
    })
  }

  getPlayingDuration(): number {
    return this.currentlyPlayingTrack.duration;
  }

  initTrackAudio(url: string): void {
    if(this.currentlyPlayingTrack) {
      this.currentlyPlayingTrack.pause();
    }
    this.currentlyPlayingTrack = new Audio(url);
    this.play();
  }
}
