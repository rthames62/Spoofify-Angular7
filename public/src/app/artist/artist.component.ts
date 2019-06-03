import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist, Album, Track } from '../shared/types/spotify-types';
import { SpotifyConnectService } from '../shared/services/spotify.service';

@Component({
  selector: 'sc-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: Artist;
  artistImage;
  albums: Album[];
  singles: Album[];
  compilations: Album[];
  appearsOn: Album[];
  topTracks: Track[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyConnectService) { }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.artist = data.artist;
      this.artistImage = this.setArtistImage(this.artist.images[0].url);
      this.resetAlbumData();
      this.loadAlbumData();
    });
  }

  private setArtistImage(url: string) {
    return { 'background-image': `url('${url}')` };
  }

  private loadAlbumData(): void {
    this.spotifyService.getArtistAlbums(this.route.snapshot.params.id).subscribe(albums => this.albums = albums.items);
    this.spotifyService.getArtistAlbumSingles(this.route.snapshot.params.id).subscribe(singles => this.singles = singles.items);
    this.spotifyService.getArtistByTopTracks(this.route.snapshot.params.id).subscribe(tracks => {
      this.topTracks = tracks;
    });
    this.spotifyService.getArtistAlbumCompilations(this.route.snapshot.params.id).subscribe(compilations => this.compilations = compilations.items);
    this.spotifyService.getArtistAlbumAppearsOn(this.route.snapshot.params.id).subscribe(albums => this.appearsOn = albums.items);
  }

  private resetAlbumData(): void {
    this.albums = [];
    this.singles = [];
    this.topTracks = [];
    this.compilations = [];
    this.appearsOn = [];
  }
}
