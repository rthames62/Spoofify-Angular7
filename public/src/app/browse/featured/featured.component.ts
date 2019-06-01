import { Component, OnInit } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sc-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  featuredPlaylists;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => this.featuredPlaylists = data.playlists);
  }

}
