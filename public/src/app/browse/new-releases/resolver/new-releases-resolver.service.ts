import { Injectable } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewReleasesResolverService {

  constructor(private spotifyService: SpotifyConnectService, private router: Router) { }

  resolve(route: ActivatedRoute) {
    return this.spotifyService.getNewReleases().pipe(
      take(1),
      mergeMap(release => {
        if(release) {
          return of(release);
        } else {
          return EMPTY;
        }
      })
    )
  }
}
