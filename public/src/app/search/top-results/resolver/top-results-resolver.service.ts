import { Injectable } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopResultsResolverService {

  constructor(private spotifyService: SpotifyConnectService, private router: Router) { }

  resolve(route: ActivatedRoute) {
    return this.spotifyService.searchSpotify(route.parent.params['id']).pipe(
      take(1),
      mergeMap(results => {
        if(results) {
          return of(results)
        } else {
          this.router.navigate(['/browse']);
          return EMPTY;
        }
      })
    )
  }
}
