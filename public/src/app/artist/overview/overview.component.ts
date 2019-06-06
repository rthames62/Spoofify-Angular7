import { Component, OnInit } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Album, Track } from 'src/app/shared/types/spotify-types';

@Component({
  selector: 'sc-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  albums: Album[];
  singles: Album[];
  compilations: Album[];
  appearsOn: Album[];
  topTracks: Track[];

  constructor(private spotifyService: SpotifyConnectService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route);
    this.route.data.subscribe(data => {
      console.log(data);
      this.resetAlbumData();
      this.loadAlbumData();
    })
  }

  private loadAlbumData(): void {
    this.spotifyService.getArtistAlbums(this.route.snapshot.params.id).subscribe(albums => {
      this.albums = albums.items;
      if(albums.items) {
        albums.items.forEach(album => {
          this.spotifyService.getAlbumById(album.id).subscribe(res => {
            album.tracks = {
              items: res.tracks.items
            }
          })
        });
      }
    });
    this.spotifyService.getArtistAlbumSingles(this.route.snapshot.params.id).subscribe(singles => {
      this.singles = singles.items;
      if(singles.items) {
        singles.items.forEach(album => {
          this.spotifyService.getAlbumById(album.id).subscribe(res => {
            album.tracks = {
              items: res.tracks.items
            }
          })
        });
      }
    });
    this.spotifyService.getArtistByTopTracks(this.route.snapshot.params.id).subscribe(tracks => {
      this.topTracks = tracks.items;
      if(tracks.items) {
        tracks.items.forEach(album => {
          this.spotifyService.getAlbumById(album.id).subscribe(res => {
            album.tracks = {
              items: res.tracks.items
            }
          })
        });
      }
    });
    this.spotifyService.getArtistAlbumCompilations(this.route.snapshot.params.id).subscribe(compilations => {
      this.compilations = compilations.items;
      if(compilations.items) {
        compilations.items.forEach(album => {
          this.spotifyService.getAlbumById(album.id).subscribe(res => {
            album.tracks = {
              items: res.tracks.items
            }
          })
        });
      }
    });
    this.spotifyService.getArtistAlbumAppearsOn(this.route.snapshot.params.id).subscribe(albums => {
      this.appearsOn = albums.items;
      if(albums.items) {
        albums.items.forEach(album => {
          this.spotifyService.getAlbumById(album.id).subscribe(res => {
            album.tracks = {
              items: res.tracks.items
            }
          })
        });
      }
    });
  }

  private resetAlbumData(): void {
    this.albums = [];
    this.singles = [];
    this.topTracks = [];
    this.compilations = [];
    this.appearsOn = [];
  }
}
