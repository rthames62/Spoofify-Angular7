import { Injectable } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot, Router, ResolveData } from '@angular/router';
import { SpotifyConnectService } from '../../shared/services/spotify.service';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistResolverService implements ResolveData {

  constructor(private spotify: SpotifyConnectService, private router: Router) { }

  resolve(route: ActivatedRoute, state: RouterStateSnapshot) {
    return this.spotify.getPlaylistById(route.params['id']).pipe(
      take(1),
      mergeMap(playlist => {
        if(playlist) {
          return of(playlist);
        } else {
          this.router.navigate(['/browse/featured']);
          return EMPTY;
        }
      })
    )
  }
}
