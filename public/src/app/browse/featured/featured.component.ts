import { Component, OnInit } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';

@Component({
  selector: 'sc-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  featuredPlaylists;

  constructor(private spotifyService: SpotifyConnectService) { }

  ngOnInit() {
    this.spotifyService.getFeaturedPlaylists().subscribe(playlist => {
      this.featuredPlaylists = playlist;
    })
  }

}
