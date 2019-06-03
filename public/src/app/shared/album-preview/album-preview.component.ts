import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../types/spotify-types';

@Component({
  selector: 'sc-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.scss']
})
export class AlbumPreviewComponent implements OnInit {

  @Input('album') album: Album;

  constructor() { }

  ngOnInit() {
    
  }

}
