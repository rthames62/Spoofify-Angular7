import { Injectable } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { Router, ResolveData, ActivatedRoute } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturedResolverService implements ResolveData {

  constructor(private spotify: SpotifyConnectService, private router: Router) { }

  resolve() {
    return this.spotify.getFeaturedPlaylists().pipe(
      take(1),
      mergeMap(playlist => {
        if(playlist) {
          return of(playlist);
        } else {
          return EMPTY;
        }
      })
    )
  }
}
