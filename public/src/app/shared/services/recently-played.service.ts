import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Track } from '../types/spotify-types';

@Injectable({
  providedIn: 'root'
})
export class RecentlyPlayedService {

  recentlyPlayed: Track[] = [];
  recentlyPlayed$: Subject<Track[]> = new Subject;

  constructor() { }

  addToRecentlyPlayed(item: Track): void {
    this.recentlyPlayed = this.recentlyPlayed.filter(track => item.id !== track.id);
    this.recentlyPlayed.unshift(item);
    this.recentlyPlayed = this.recentlyPlayed.slice(0, 7);
    this.recentlyPlayed$.next(this.recentlyPlayed);
  }
}
