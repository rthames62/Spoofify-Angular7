import { Injectable } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { ResolveData, ActivatedRoute, Router } from '@angular/router';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumResolverService implements ResolveData {

  constructor(private spotifyService: SpotifyConnectService, private router: Router) { }

  resolve(route: ActivatedRoute) {
    return this.spotifyService.getAlbumById(route.params['id']).pipe(
      take(1),
      mergeMap(album => {
        if(album) {
          return of(album);
        } else {
          this.router.navigate(['/browse/featured']);
          return EMPTY;
        }
      })
    )
  }
}
