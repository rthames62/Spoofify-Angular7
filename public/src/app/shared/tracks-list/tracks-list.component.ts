import { Component, OnInit, Input } from '@angular/core';
import { convertMillisecondsToMinutes } from "../core/utils";
import { NowPlayingService } from '../services/now-playing.service';
import { Track } from '../types/spotify-types';

@Component({
  selector: 'sc-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {

  @Input('tracks') tracks;

  constructor(private nowPlayingService: NowPlayingService) { }

  ngOnInit() {
    console.log('xxxxxxxx', this.tracks);
  }

  updateNowPlaying(track: Track): void {
    this.nowPlayingService.updateNowPlaying(track, this.tracks);
  }

  convertDuration(millis: number): string {
    return convertMillisecondsToMinutes(millis);
  }
}
