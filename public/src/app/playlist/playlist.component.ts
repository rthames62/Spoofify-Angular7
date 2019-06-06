import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track, Playlist } from '../shared/types/spotify-types';

@Component({
  selector: 'sc-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlist: Playlist;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.playlist = data.playlist;
    });
  }
}
