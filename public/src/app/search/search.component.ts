import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { SpotifyConnectService } from '../shared/services/spotify.service';
import { MainBackgroundService } from '../shared/services/main-background.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Album, Track, Artist, Playlist } from '../shared/types/spotify-types';

@Component({
  selector: 'sc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('searchField') searchField;
  results;

  constructor(private backgroundService: MainBackgroundService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private spotifySerivce: SpotifyConnectService) {

  }

  ngOnInit() {
    this.backgroundService.updateBackgroundColor();
    this.searchField.nativeElement.focus();
  }

  ngAfterViewInit() {
    
  }

  ngOnChanges(e) {
    console.log(e);
  }

  search(value) {
    delete this.results;
    if(value.length > 2) {
      this.spotifySerivce.searchSpotify(value).subscribe(results => {
        console.log(results);
        results.tracks.items = results.tracks.items.slice(0, 5);
        results.artists.items = results.artists.items.slice(0, 8);
        this.results = results;
      })
    }
  }
}
