import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NowPlayingService } from '../shared/services/now-playing.service';
import { Playlist, Track } from '../shared/types/spotify-types';
import { MainBackgroundService } from '../shared/services/main-background.service';
import { removeTracksWithoutPreview } from "../shared/core/utils";

@Component({
  selector: 'sc-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  playlist: Playlist;
  currentlyPlayingFlag: boolean = false;
  currentlyPlayingInPlaylist: boolean = false;
  currentlyPlayingTrack: Track;
  trackList: Track[] = [];

  constructor(private route: ActivatedRoute,
    private nowPlaying: NowPlayingService,
    private backgroundService: MainBackgroundService) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.playlist = data.playlist;
      this.playlist.tracks.items.forEach(track => this.trackList.push(track.track));
    });
    this.nowPlaying.nowPlaying$.subscribe(nowPlaying => {
      if(nowPlaying.track) {
        const items = this.playlist.tracks.items;
        this.currentlyPlayingTrack = nowPlaying.track;
        for(let i = 0; i < items.length; i++) {
          if(items[i].track.id === nowPlaying.track.id) {
            this.currentlyPlayingInPlaylist = true;
            break;
          }
        }
      }
    })
    this.nowPlaying.currentlyPlaying$.subscribe(cp => this.currentlyPlayingFlag = cp);
  }

  ngOnDestroy() {
    this.backgroundService.updateBackgroundColor(this.backgroundService.defaultColor);
    localStorage.removeItem('saved-cover-art');
  }

  updateNowPlaying(track: Track): void {
    this.nowPlaying.updateNowPlaying(track, this.trackList);
  }

  play(): void {
    if(this.currentlyPlayingTrack && this.currentlyPlayingInPlaylist) {
      this.nowPlaying.play();
    } else {
      const tracksWithPreview = removeTracksWithoutPreview(this.trackList);
      console.log(this.trackList);
      this.nowPlaying.updateNowPlaying(tracksWithPreview[0], this.trackList);
    }
  }

  pause(): void {
    this.nowPlaying.pause();
  }
}
