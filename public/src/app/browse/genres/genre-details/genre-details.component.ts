import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist, Category } from 'src/app/shared/types/spotify-types';

@Component({
  selector: 'sc-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss']
})
export class GenreDetailsComponent implements OnInit {

  playlists: Playlist[];
  genre: Category;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.genre = data.playlists[1];
      this.playlists = data.playlists[0].playlists.items;
    });
  }

}
