import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { Track, Album, Playlist } from '../types/spotify-types';
import { NowPlayingService } from '../services/now-playing.service';
import { MainBackgroundService } from '../services/main-background.service';
import { removeTracksWithoutPreview } from "../core/utils";

@Component({
  selector: 'sc-album-layout',
  templateUrl: './album-layout.component.html',
  styleUrls: ['./album-layout.component.scss']
})
export class AlbumLayoutComponent implements OnInit, OnDestroy, OnChanges {
  
  @Input('album') album: Album;
  @Input('playlist') playlist: Playlist;

  currentlyPlayingFlag: boolean = false;
  currentlyPlayingInTrackList: boolean = false;
  currentlyPlayingTrack: Track;
  tracks: Track[] = [];

  constructor(private nowPlayingService: NowPlayingService, private backgroundService: MainBackgroundService) { }

  ngOnInit() {
    console.log(this.album);
    if(this.playlist) {
      this.playlist.tracks.items.forEach(track => this.tracks.push(track.track));
    } else if(this.album) {
      this.tracks = this.album.tracks.items;
      this.tracks.forEach(track => {
        track.album = {
          id: this.album.id,
          images: this.album.images
        }
      })
    }

    this.nowPlayingService.nowPlaying$.subscribe(nowPlaying => {
      if(nowPlaying.track) {
        this.currentlyPlayingTrack = nowPlaying.track;
        for(let i = 0; i < this.tracks.length; i++) {
          if(this.tracks[i].id === nowPlaying.track.id) {
            this.currentlyPlayingInTrackList = true;
            break;
          }
        }
      }
    });
    this.nowPlayingService.currentlyPlaying$.subscribe(cp => this.currentlyPlayingFlag = cp);
  }

  ngOnDestroy() {
    this.backgroundService.updateBackgroundColor(this.backgroundService.defaultColor);
  }

  ngOnChanges(e) {

  }

  updateNowPlaying(track: Track): void {
    this.nowPlayingService.updateNowPlaying(track, this.tracks);
  }

  play(): void {
    if(this.currentlyPlayingTrack && this.currentlyPlayingInTrackList) {
      this.nowPlayingService.play();
    } else {
      const tracksWithPreview = removeTracksWithoutPreview(this.tracks);
      this.nowPlayingService.updateNowPlaying(tracksWithPreview[0], this.tracks);
    }
  }

  pause(): void {
    this.nowPlayingService.pause();
  }
}
