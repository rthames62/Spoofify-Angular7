import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist, Album, Track } from '../shared/types/spotify-types';
import { SpotifyConnectService } from '../shared/services/spotify.service';
import { NowPlayingService } from '../shared/services/now-playing.service';
import { removeTracksWithoutPreview } from "../shared/core/utils";

@Component({
  selector: 'sc-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: Artist;
  artistImage;
  topTracks: Track[];

  currentlyPlayingFlag: boolean = false;
  currentlyPlayingArtist: boolean = false;
  currentlyPlayingTrack: Track;

  constructor(private route: ActivatedRoute, private nowPlayingService: NowPlayingService) { }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.artist = data.artistData[0];
      this.topTracks = data.artistData[1].tracks;

      this.artistImage = this.setArtistImage(this.artist.images[0].url);
      this.resetArtistData();

      this.nowPlayingService.nowPlaying$.subscribe(nowPlaying => {
        if(nowPlaying.track) {
          this.currentlyPlayingTrack = nowPlaying.track;
          this.currentlyPlayingArtist = nowPlaying.idOfTracklist === this.artist.id
        }
      });
      this.nowPlayingService.currentlyPlaying$.subscribe(cp => this.currentlyPlayingFlag = cp);
    });
  }

  play(): void {
    if(this.currentlyPlayingArtist) {
      this.nowPlayingService.play();
    } else {
      const tracksWithAudio = removeTracksWithoutPreview(this.topTracks);
      this.nowPlayingService.updateNowPlaying(tracksWithAudio[0], tracksWithAudio, this.artist.id);
    }
  }

  pause(): void {
    this.nowPlayingService.pause();
  }

  private setArtistImage(url: string) {
    return { 'background-image': `url('${url}')` };
  }

  private resetArtistData(): void {
    this.currentlyPlayingArtist = false;
  }
}
