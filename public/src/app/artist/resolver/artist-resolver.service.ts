import { Injectable } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/shared/types/spotify-types';

@Injectable({
  providedIn: 'root'
})
export class ArtistResolverService {

  constructor(private spotify: SpotifyConnectService) { }

  resolve(route: ActivatedRoute): Observable<Artist> {
    return this.spotify.getArtistById(route.params['id']).pipe(
      take(1),
      mergeMap(artist => {
        if(artist) {
          return of(artist);
        } else {
          return EMPTY;
        }
      })
    )
  }
}
