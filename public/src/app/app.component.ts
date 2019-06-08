import { Component, OnInit } from '@angular/core';
import { MainBackgroundService } from './shared/services/main-background.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'sc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Spoofify';
  backgroundColor;

  constructor(private backgroundService: MainBackgroundService, private router: Router) {
    
  }

  ngOnInit() {
    // Update gradient color to match album/playlist
    this.backgroundService.backgroundColor$.subscribe(color => {
      this.backgroundColor = this.setGradient(color);
    });

    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })
  }

  setGradient(hex: string): object {
    const style = { 'background': `linear-gradient(to right bottom, #${hex} -50%, rgb(0, 0, 0) 100%), linear-gradient(transparent, rgb(0, 0, 0) 70%)` };

    return style;
  }
}
