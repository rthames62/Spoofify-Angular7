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
  topTracks: Track[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyConnectService) { }

  ngOnInit() {
    console.log(this.route);
    this.route.data.subscribe((data: any) => {
      this.artist = data.artist;
      this.artistImage = this.setArtistImage(this.artist.images[0].url);
    });
    this.spotifyService.getArtistAlbums(this.route.snapshot.params.id).subscribe(albums => {
      console.log(albums);
      this.albums = albums;
    })
    this.spotifyService.getArtistByTopTracks(this.route.snapshot.params.id).subscribe(tracks => {
      console.log(tracks);
      this.topTracks = tracks;
    })
  }

  private setArtistImage(url: string) {
    return { 'background-image': `url('${url}')` };
  }
}
