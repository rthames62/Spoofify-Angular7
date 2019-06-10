import { Component, OnInit, Input } from '@angular/core';
import { Album, Playlist, Track } from '../types/spotify-types';
import { NowPlayingService, NowPlaying } from '../services/now-playing.service';
import { removeTracksWithoutPreview, checkForPreviews } from "../core/utils";
import { SpotifyConnectService } from '../services/spotify.service';

@Component({
  selector: 'sc-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.scss']
})
export class AlbumPreviewComponent implements OnInit {

  @Input() album: Album;
  @Input() playlist: Playlist;
  currentlyPlayingTrack: Track;
  currentlyPlayingFlag: boolean = false;
  currentlyPlayingInAlbum: boolean = false;
  playlistTracksList: Track[] = [];
  hasPreviews: boolean = true;

  constructor(private nowPlayingService: NowPlayingService, private spotifyService: SpotifyConnectService) { }

  ngOnInit() {
    if(this.playlist) {
      if(this.playlist.tracks && this.playlist.tracks.items) {
        this.convertPlaylistTracks();
        this.hasPreviews = checkForPreviews(this.playlistTracksList);
      } else {
        this.spotifyService.getPlaylistById(this.playlist.id).subscribe(playlist => {
          this.playlist = playlist;
          this.convertPlaylistTracks();
          this.hasPreviews = checkForPreviews(this.playlistTracksList);
        })
      }
    }
    if(this.album) {
      if(this.album.tracks) {
        this.hasPreviews = checkForPreviews(this.album.tracks.items);
      } else {
        this.spotifyService.getAlbumById(this.album.id).subscribe(album => {
          this.album = album;
          this.hasPreviews = checkForPreviews(this.album.tracks.items);
        })
      }
    }
    this.nowPlayingService.nowPlaying$.subscribe((nowPlaying: NowPlaying) => {
      if(nowPlaying.track) {
        this.currentlyPlayingTrack = nowPlaying.track;
        this.currentlyPlayingInAlbum = this.album ? this.album.id === nowPlaying.idOfTracklist : this.playlist.id === nowPlaying.idOfTracklist;
      }
    });
    this.nowPlayingService.currentlyPlaying$.subscribe(cp => this.currentlyPlayingFlag = cp);
  }

  play(): void {
    if(this.playlist && !this.playlist.tracks.items) {
      this.spotifyService.getPlaylistById(this.playlist.id).subscribe(playlist => {
        this.playlist = playlist;
        this.convertPlaylistTracks();
        const tracksWithAudio = removeTracksWithoutPreview(this.playlistTracksList);
        this.nowPlayingService.updateNowPlaying(tracksWithAudio[0], tracksWithAudio, this.playlist.id);
      })
    } else if(this.album && !this.album.tracks) {
      this.spotifyService.getAlbumById(this.album.id).subscribe(album => {
        this.album = album;
        this.convertAlbumsTracks();
        const tracksWithAudio = removeTracksWithoutPreview(this.album.tracks.items);
        this.nowPlayingService.updateNowPlaying(tracksWithAudio[0], tracksWithAudio, this.album.id);
      })
    } else {
      if(this.currentlyPlayingTrack && this.currentlyPlayingInAlbum) {
        this.nowPlayingService.play();
      } else {
        if(this.album) {
          this.convertAlbumsTracks();
          const tracksWithAudio = removeTracksWithoutPreview(this.album.tracks.items);
          this.nowPlayingService.updateNowPlaying(tracksWithAudio[0], tracksWithAudio, this.album.id);
        } else if(this.playlist) {
          const tracksWithAudio = removeTracksWithoutPreview(this.playlistTracksList);
          this.nowPlayingService.updateNowPlaying(tracksWithAudio[0], tracksWithAudio, this.playlist.id);
        }
      }
    }
  }

  pause(): void {
    this.nowPlayingService.pause();
  }

  private convertPlaylistTracks(): void {
    this.playlist.tracks.items.forEach(track => this.playlistTracksList.push(track.track));
  }

  private convertAlbumsTracks(): void {
    this.album.tracks.items.forEach(track => {
      track.album = {
        id: this.album.id,
        images: this.album.images
      }
    });
  }

}
