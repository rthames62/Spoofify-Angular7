import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { convertMillisecondsToMinutes } from "../core/utils";
import { NowPlayingService } from '../services/now-playing.service';
import { Track } from '../types/spotify-types';

@Component({
  selector: 'sc-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit, OnChanges {

  @Input() tracks: Track[];
  @Input() id: string;
  @Input() type: 'popular' | 'full-detail' | 'less-detail';
  tracksList: Track[];
  currentlyPlaying: boolean = false;

  constructor(private nowPlayingService: NowPlayingService) {
    if(!this.type) {
      this.type = 'full-detail';
    }
  }

  ngOnInit() {
    
  }

  ngOnChanges(e) {
    if(e.tracks && e.tracks.currentValue) {
      this.tracksList = e.tracks.currentValue;
      this.initTracksList();
    }
    this.nowPlayingService.nowPlaying$.subscribe(currentTrack => {
      console.log(currentTrack);
      if(currentTrack.trackList) {
        if(this.tracksList) {
          this.tracksList.forEach(track => track.currentlyPlaying = track.id === currentTrack.track.id);
        }
      }
    })
    this.nowPlayingService.currentlyPlaying$.subscribe(bool => {
      this.currentlyPlaying = bool;
    });
  }

  updateNowPlaying(track: Track): void {
    this.nowPlayingService.updateNowPlaying(track, this.tracksList, this.id);
  }

  convertDuration(millis: number): string {
    return convertMillisecondsToMinutes(millis);
  }

  convertPlaylistTracks(tracks): Track[] {
    let arr = [];
    tracks.forEach(x => arr.push(x.track));
    return arr;
  }

  pauseTrack(): void {
    this.nowPlayingService.pause();
  }

  private initTracksList(): void {
    this.tracksList = this.type === 'popular' ? this.tracksList.slice(0, 5) : this.tracksList;
    this.tracksList.forEach(track => track.currentlyPlaying = false);
  }
}
