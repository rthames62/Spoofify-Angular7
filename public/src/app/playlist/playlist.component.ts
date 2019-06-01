import { Component, OnInit } from '@angular/core';
import { SpotifyConnectService } from '../shared/services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sc-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  playlist;

  constructor(private spotify: SpotifyConnectService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.playlist = data.playlist;
    })
  }

}
