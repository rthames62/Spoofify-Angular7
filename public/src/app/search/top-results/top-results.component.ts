import { Component, OnInit } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Album, Track, Artist, Playlist } from 'src/app/shared/types/spotify-types';

@Component({
  selector: 'sc-top-results',
  templateUrl: './top-results.component.html',
  styleUrls: ['./top-results.component.scss']
})
export class TopResultsComponent implements OnInit {

  albums: Album[];
  tracks: Track[];
  artists: Artist[];
  playlists: Playlist[];

  constructor(private spotifyService: SpotifyConnectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.albums = data.results.albums.items;
      this.tracks = data.results.tracks.items.slice(0, 5);
      this.artists = data.results.artists.items;
      this.playlists = data.results.playlists.items;
    })
  }

}
