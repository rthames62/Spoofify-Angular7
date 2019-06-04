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

  @Input('tracks') tracks;
  @Input('type') type: 'popular' | 'full-detail' | 'less-detail';
  tracksList;
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
      this.initTracksList();
    }
    this.nowPlayingService.nowPlaying$.subscribe(currentTrack => {
      if(currentTrack.trackList) {
        this.tracksList.forEach(track => track.currentlyPlaying = track.id === currentTrack.track.id);
      }
    })
    this.nowPlayingService.currentlyPlaying$.subscribe(bool => {
      this.currentlyPlaying = bool;
    });
  }

  updateNowPlaying(track: Track): void {
    this.nowPlayingService.updateNowPlaying(track, this.tracksList);
  }

  convertDuration(millis: number): string {
    return convertMillisecondsToMinutes(millis);
  }

  convertPlaylistTracks(tracks) {
    let arr = [];
    tracks.forEach(x => arr.push(x.track));
    return arr;
  }

  pauseTrack(): void {
    this.nowPlayingService.pause();
  }

  private initTracksList() {
    this.tracksList = this.tracks[0].track ? this.convertPlaylistTracks(this.tracks) : this.tracks;
    this.tracksList = this.type === 'popular' ? this.tracksList.slice(0, 5) : this.tracksList;
    this.tracksList.forEach(track => track.currentlyPlaying = false);
  }
}
