import { Injectable } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY, Observable, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from 'src/app/shared/types/spotify-types';

@Injectable({
  providedIn: 'root'
})
export class ArtistResolverService {

  constructor(private spotify: SpotifyConnectService, private router: Router) { }

  resolve(route: ActivatedRoute): Observable<any> {
    return forkJoin(
      this.spotify.getArtistById(route.params['id']).pipe(
        take(1),
        mergeMap(artist => {
          if(artist) {
            return of(artist);
          } else {
            this.router.navigate(['/featured/browse']);
            return EMPTY;
          }
        })
      ),
      this.spotify.getArtistByTopTracks(route.params['id']).pipe(
        take(1),
        mergeMap(tracks => {
          if(tracks) {
            return of(tracks);
          } else {
            this.router.navigate(['/featured/browse']);
            return EMPTY;
          }
        })
      ),
    )
  }
}
