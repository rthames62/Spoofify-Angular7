import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../services/core/utils.service';

@Component({
  selector: 'sc-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {

  @Input('tracks') tracks;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
    
  }

  convertDuration(millis: number): string {
    return this.utils.convertMillisecondsToMinutes(millis);
  }
}
