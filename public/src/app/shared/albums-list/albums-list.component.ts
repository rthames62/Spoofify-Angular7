import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sc-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {

  @Input('albums') albums;
  length: number = 8;
  sliceLength: number;

  constructor() { }

  ngOnInit() {
    this.sliceLength = this.length;
  }

}
