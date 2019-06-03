import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NowPlayingService } from '../shared/services/now-playing.service';
import { Playlist, Track } from '../shared/types/spotify-types';
import { MainBackgroundService } from '../shared/services/main-background.service';

@Component({
  selector: 'sc-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  playlist: Playlist;

  constructor(private route: ActivatedRoute,
    private nowPlaying: NowPlayingService,
    private backgroundService: MainBackgroundService) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.playlist = data.playlist;
    })
  }

  ngOnDestroy() {
    this.backgroundService.updateBackgroundColor(this.backgroundService.defaultColor);
    localStorage.removeItem('saved-cover-art');
  }

  updateNowPlaying(track: Track): void {
    this.nowPlaying.updateNowPlaying(track, this.playlist.tracks.items);
  }
}
