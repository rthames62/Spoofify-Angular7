import { Component, OnInit } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Album, Track, Artist } from 'src/app/shared/types/spotify-types';

@Component({
  selector: 'sc-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  artist: Artist;
  albums: Album[];
  singles: Album[];
  compilations: Album[];
  appearsOn: Album[];
  topTracks: Track[];

  constructor(private spotifyService: SpotifyConnectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.albums = data.albums[0].items;
      this.singles = data.albums[1].items;
      this.compilations = data.albums[2].items;
      this.appearsOn = data.albums[3].items;
      this.artist = data.artistData[0];
      this.topTracks = data.artistData[1].tracks;
      this.loadAlbumData();
    })
  }

  private loadAlbumData(): void {
    this.albums.forEach(album => {
      this.spotifyService.getAlbumById(album.id).subscribe(res => {
        album.tracks = {
          items: res.tracks.items
        }
      })
    });
    this.singles.forEach(album => {
      this.spotifyService.getAlbumById(album.id).subscribe(res => {
        album.tracks = {
          items: res.tracks.items
        }
      })
    });
    this.compilations.forEach(album => {
      this.spotifyService.getAlbumById(album.id).subscribe(res => {
        album.tracks = {
          items: res.tracks.items
        }
      })
    });
    this.appearsOn.forEach(album => {
      this.spotifyService.getAlbumById(album.id).subscribe(res => {
        album.tracks = {
          items: res.tracks.items
        }
      })
    });
  }
}
