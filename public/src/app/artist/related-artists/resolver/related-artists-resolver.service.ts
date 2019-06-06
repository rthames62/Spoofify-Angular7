import { Injectable } from '@angular/core';
import { ResolveData, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatedArtistsResolverService implements ResolveData {

  constructor(private spotifySerfice: SpotifyConnectService) { }

  resolve(route: ActivatedRoute) {
    return this.spotifySerfice.getArtistRelatedArtists(route.parent.params['id']).pipe(
      take(1),
      mergeMap(artists => {
        console.log(artists);
        if(artists) {
          return of(artists);
        } else {
          return EMPTY;
        }
      })
    )
  }
}
