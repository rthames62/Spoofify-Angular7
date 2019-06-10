import { Component, OnInit } from '@angular/core';
import { RecentlyPlayedService } from '../shared/services/recently-played.service';

@Component({
  selector: 'sc-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss']
})
export class SidebarNavigationComponent implements OnInit {

  recentlyPlayed: any[];

  constructor(private recentlyPlayedService: RecentlyPlayedService) { }

  ngOnInit() {
    this.recentlyPlayedService.recentlyPlayed$.subscribe(val => this.recentlyPlayed = val);
  }

}
