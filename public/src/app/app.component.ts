import { Component, OnInit } from '@angular/core';
import { MainBackgroundService } from './shared/services/main-background.service';
import { Router } from '@angular/router';

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
  }

  setGradient(hex: string): object {
    return { 'background': `linear-gradient(to right bottom, ${hex}, rgb(0, 0, 0)), linear-gradient(transparent, rgb(0, 0, 0) 70%)` };
  }
}
