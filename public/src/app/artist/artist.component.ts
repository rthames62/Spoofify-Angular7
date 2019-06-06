import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist, Album, Track } from '../shared/types/spotify-types';
import { SpotifyConnectService } from '../shared/services/spotify.service';
import { NowPlayingService } from '../shared/services/now-playing.service';
import { removeTracksWithoutPreview } from "../shared/core/utils";

@Component({
  selector: 'sc-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: Artist;
  artistImage;
  albums: Album[];

  currentlyPlayingFlag: boolean = false;
  currentlyPlayingArtist: boolean = false;
  currentlyPlayingTrack: Track;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyConnectService, private nowPlayingService: NowPlayingService) { }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.artist = data.artist;
      this.artistImage = this.setArtistImage(this.artist.images[0].url);
      this.resetArtistData();

      this.nowPlayingService.nowPlaying$.subscribe(nowPlaying => {
        if(nowPlaying.track) {
          this.currentlyPlayingTrack = nowPlaying.track;
          for(let i = 0; i < nowPlaying.track.artists.length; i++) {
            if(nowPlaying.track.artists[i].id === this.artist.id) {
              this.currentlyPlayingArtist = true;
              break;
            }
          }
        }
      });
      this.nowPlayingService.currentlyPlaying$.subscribe(cp => this.currentlyPlayingFlag = cp);
      this.spotifyService.getArtistAlbums(this.artist.id).subscribe(albums => {
        this.albums = albums.items;
        this.albums.forEach(album => {
          this.spotifyService.getAlbumById(album.id).subscribe(res => {
            album.tracks = { items: res.tracks.items }
          })
        })
      });
    });
  }

  play(): void {
    if(this.currentlyPlayingArtist) {
      this.nowPlayingService.play();
    } else {
      const tracksOnFirstAlbum = this.albums[0].tracks.items;
      tracksOnFirstAlbum.forEach(track => {
        track.album = {
          id: this.albums[0].id,
          images: this.albums[0].images
        }
      })
      const tracksWithAudio = removeTracksWithoutPreview(tracksOnFirstAlbum);
      this.nowPlayingService.updateNowPlaying(tracksWithAudio[0], tracksWithAudio);
    }
  }

  pause(): void {
    this.nowPlayingService.pause();
  }

  private setArtistImage(url: string) {
    return { 'background-image': `url('${url}')` };
  }

  private resetArtistData(): void {
    this.albums = [];
    this.currentlyPlayingArtist = false;
  }
}
