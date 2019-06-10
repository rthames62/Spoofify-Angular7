import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { SpotifyConnectService } from '../shared/services/spotify.service';
import { MainBackgroundService } from '../shared/services/main-background.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Album, Track, Artist, Playlist } from '../shared/types/spotify-types';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('searchField') searchField;
  results;
  searchSubject: Subject<string> = new Subject;

  constructor(private backgroundService: MainBackgroundService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private spotifySerivce: SpotifyConnectService) {

  }

  ngOnInit() {
    this.searchField.nativeElement.focus();
    this.searchSubject.pipe(debounceTime(500)).subscribe(search => {
      this.spotifySerivce.searchSpotify(search).subscribe(results => {
        results.tracks.items = results.tracks.items.slice(0, 5);
        results.artists.items = results.artists.items.slice(0, 8);
        this.results = results;
      })
    })
  }

  ngAfterViewInit() {
    
  }

  ngOnChanges(e) {
    
  }

  search(value: string): void {
    delete this.results;
    if(value.length > 2) {
      this.searchSubject.next(value);
    }
  }
}
