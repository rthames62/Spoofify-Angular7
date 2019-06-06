import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/shared/types/spotify-types';

@Component({
  selector: 'sc-related-artists',
  templateUrl: './related-artists.component.html',
  styleUrls: ['./related-artists.component.scss']
})
export class RelatedArtistsComponent implements OnInit {

  related: Artist[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.related = data.artists.artists;
    })
  }

}
