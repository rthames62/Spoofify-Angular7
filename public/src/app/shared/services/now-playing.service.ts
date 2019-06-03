import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Track } from '../types/spotify-types';

export interface NowPlaying {
  track: Track,
  trackList: Track[]
}

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService {

  nowPlaying: Subject<NowPlaying> = new Subject<NowPlaying>();
  nowPlaying$: Observable<any> = this.nowPlaying.asObservable();
  currentlyPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentlyPlaying$: Observable<any> = this.currentlyPlaying.asObservable();

  constructor() { }

  updateNowPlaying(track: Track, trackList?: Track[]): void {
    this.nowPlaying.next({ track: track, trackList: trackList });
  }
}
