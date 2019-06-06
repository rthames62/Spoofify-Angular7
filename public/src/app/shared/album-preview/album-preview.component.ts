import { Component, OnInit, Input } from '@angular/core';
import { Album, Playlist, Track } from '../types/spotify-types';
import { NowPlayingService, NowPlaying } from '../services/now-playing.service';
import { removeTracksWithoutPreview } from "../core/utils";

@Component({
  selector: 'sc-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.scss']
})
export class AlbumPreviewComponent implements OnInit {

  @Input('album') album: Album;
  @Input('playlist') playlist: Playlist;
  currentlyPlayingTrack: Track;
  currentlyPlayingFlag: boolean = false;
  currentlyPlayingInAlbum: boolean = false;
  playlistTracksList: Track[] = [];

  constructor(private nowPlayingService: NowPlayingService) { }

  ngOnInit() {
    if(this.playlist) {
      this.playlist.tracks.items.forEach(track => this.playlistTracksList.push(track.track));
    }
    this.nowPlayingService.nowPlaying$.subscribe((nowPlaying: NowPlaying) => {
      if(nowPlaying.track) {
        this.currentlyPlayingTrack = nowPlaying.track;
        if(this.album) {
          this.currentlyPlayingInAlbum = nowPlaying.track.album.id === this.album.id;
        } else if(this.playlist) {
          const trackList = this.playlist.tracks.items;
          for(let i = 0; i < trackList.length; i++) {
            if(trackList[i].track.id === nowPlaying.track.id) {
              this.currentlyPlayingInAlbum = true;
              break;
            }
          }
        }
      }
    });
    this.nowPlayingService.currentlyPlaying$.subscribe(cp => this.currentlyPlayingFlag = cp);
  }

  play(): void {
    if(this.currentlyPlayingTrack && this.currentlyPlayingInAlbum) {
      this.nowPlayingService.play();
    } else {
      if(this.album) {
        this.album.tracks.items.forEach(track => {
          track.album = {
            id: this.album.id,
            images: this.album.images
          }
        });
        const tracksWithAudio = removeTracksWithoutPreview(this.album.tracks.items);
        this.nowPlayingService.updateNowPlaying(tracksWithAudio[0], tracksWithAudio);
      } else if(this.playlist) {
        const tracksWithAudio = removeTracksWithoutPreview(this.playlistTracksList);
        this.nowPlayingService.updateNowPlaying(tracksWithAudio[0], tracksWithAudio);
      }
    }
  }

  pause(): void {
    this.nowPlayingService.pause();
  }
}
