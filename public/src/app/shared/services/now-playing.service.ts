import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Track } from '../types/spotify-types';
import { removeTracksWithoutPreview } from "../core/utils";
import { RecentlyPlayedService } from './recently-played.service';

export interface NowPlaying {
  track?: Track,
  trackList?: Track[],
  idOfTracklist?: string
}

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService {

  nowPlaying: BehaviorSubject<NowPlaying> = new BehaviorSubject<NowPlaying>({ track: null, trackList: null, idOfTracklist: null });
  nowPlaying$: Observable<NowPlaying> = this.nowPlaying.asObservable();
  currentlyPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentlyPlaying$: Observable<boolean> = this.currentlyPlaying.asObservable();

  currentlyPlayingTrack;
  currentlyPlayingFlag: boolean = false;
  currentlyPlayingDurationSeconds: number = 0;
  currentlyPlayingDurationDisplay;
  currentlyPlayingProgressSeconds;
  currentlyPlayingProgress;
  currentlyPlayingProgress$: Observable<any>;
  currentlyPlayingIndex: number;
  volumeLevel: number = 1;

  constructor(private recentlyPlayedService: RecentlyPlayedService) { }

  updateNowPlaying(track: Track, trackList?: Track[], idOfTracklist?: string): void {
    const tracksWithPreview = removeTracksWithoutPreview(trackList);
    if(track && track.preview_url) {
      this.initTrackAudio(track.preview_url);
      tracksWithPreview.forEach((x, index) => {
        if(x.id === track.id) {
          this.currentlyPlayingIndex = index;
        }
      })
      this.nowPlaying.next({ track: track, trackList: tracksWithPreview, idOfTracklist });
      this.recentlyPlayedService.addToRecentlyPlayed(track);
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
      this.updateNowPlaying(trackList[this.currentlyPlayingIndex + 1], trackList, this.nowPlaying.getValue().idOfTracklist);
    }
  }

  playPrevious(): void {
    const trackList = this.nowPlaying.getValue().trackList;
    if(this.getPlayingCurrentTime() < 4) {
      if(this.currentlyPlayingIndex > 0) {
        this.updateNowPlaying(trackList[this.currentlyPlayingIndex - 1], trackList, this.nowPlaying.getValue().idOfTracklist);
      }
    } else {
      this.currentlyPlayingTrack.currentTime = 0;
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

  getPlayingCurrentTime(): number {
    return this.currentlyPlayingTrack.currentTime;
  }

  initTrackAudio(url: string): void {
    if(this.currentlyPlayingTrack) {
      this.currentlyPlayingTrack.pause();
    }
    this.currentlyPlayingTrack = new Audio(url);
    this.setVolume(this.volumeLevel);
    this.play();
  }

  setVolume(level): void {
    if(level < 0) {
      this.volumeLevel = 0
    } else if(level > 1) {
      this.volumeLevel = 1;
    } else {
      this.volumeLevel = level;
    }
    if(this.currentlyPlayingTrack) {
      this.currentlyPlayingTrack.volume = this.volumeLevel;
    }
  }
}
