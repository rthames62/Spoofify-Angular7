import { Component, OnInit } from '@angular/core';
import { NowPlayingService, NowPlaying } from '../shared/services/now-playing.service';

@Component({
  selector: 'sc-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss']
})
export class PlaybackComponent implements OnInit {

  nowPlaying: NowPlaying;

  constructor(private nowPlayingService: NowPlayingService) { }

  ngOnInit() {
    this.nowPlayingService.nowPlaying$.subscribe((nowPlaying: NowPlaying) => {
      console.log(nowPlaying);
      this.nowPlaying = nowPlaying;
    })
  }

}
