import { Component, OnInit, Input } from '@angular/core';
import { getBrowserBreakpoint } from "../core/utils";
import { fromEvent } from 'rxjs';

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
    this.setLength();
    fromEvent(window, 'resize').subscribe(e => this.setLength());
  }

  private setLength(): void {
    const breakpoint = getBrowserBreakpoint();

    switch(breakpoint) {
      case 'xl':
        this.sliceLength = 12;
        this.length = 12;
        break;
      case 'lg':
        this.sliceLength = 8;
        this.length = 8;
        break;
      case 'md':
        this.sliceLength = 6;
        this.length = 6;
        break;
      case 'sm' || 'xs':
        this.sliceLength = 4;
        this.length = 4;
        break;
    }
  }
}
