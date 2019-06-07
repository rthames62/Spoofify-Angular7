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
        this.currentlyPlayingInTrackList = this.album ? this.album.id === nowPlaying.idOfTracklist : this.playlist.id === nowPlaying.idOfTracklist;
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
    console.log(this.playlist, this.album);
    this.nowPlayingService.updateNowPlaying(track, this.tracks, this.album ? this.album.id : this.playlist.id);
  }

  play(): void {
    if(this.currentlyPlayingTrack && this.currentlyPlayingInTrackList) {
      this.nowPlayingService.play();
    } else {
      const tracksWithPreview = removeTracksWithoutPreview(this.tracks);
      this.nowPlayingService.updateNowPlaying(tracksWithPreview[0], this.tracks, this.album ? this.album.id : this.playlist.id);
    }
  }

  pause(): void {
    this.nowPlayingService.pause();
  }
}
