import { Component, OnInit } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { MainBackgroundService } from 'src/app/shared/services/main-background.service';

@Component({
  selector: 'sc-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {

  featuredPlaylists;

  constructor(private route: ActivatedRoute, private backgroundService: MainBackgroundService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.featuredPlaylists = data.playlists;
      this.backgroundService.updateBackgroundColor(this.featuredPlaylists.playlists.items[0].images[0].url);
    });
  }

}
