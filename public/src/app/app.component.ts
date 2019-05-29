import { Component } from '@angular/core';
import { SpotifyConnectService } from './shared/services/spotify-connect.service';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Spoofify';

  constructor(private spotifyConnect: SpotifyConnectService) {
    this.spotifyConnect.authorizeSpotify().subscribe(res => {
      
    })
  }
}
