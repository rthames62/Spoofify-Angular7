import { Injectable } from '@angular/core';
import { ResolveData, Resolve, ActivatedRoute, Router } from '@angular/router';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { Observable, forkJoin, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OverviewResolverService {

  constructor(private spotifyService: SpotifyConnectService, private router: Router) { }

  resolve(route: ActivatedRoute) {
    return forkJoin(
      this.spotifyService.getArtistAlbums(route.parent.params['id']).pipe(
        take(1),
        mergeMap(albums => {
          if(albums) {
            return of(albums);
          } else {
            this.router.navigate(['/featured/browse']);
            return EMPTY;
          }
        })
      ),
      this.spotifyService.getArtistAlbumSingles(route.parent.params['id']).pipe(
        take(1),
        mergeMap(singles => {
          if(singles) {
            return of(singles);
          } else {
            this.router.navigate(['/featured/browse']);
            return EMPTY;
          }
        })
      ),
      this.spotifyService.getArtistAlbumCompilations(route.parent.params['id']).pipe(
        take(1),
        mergeMap(comps => {
          if(comps) {
            return of(comps);
          } else {
            this.router.navigate(['/featured/browse']);
            return EMPTY;
          }
        })
      ),
      this.spotifyService.getArtistAlbumAppearsOn(route.parent.params['id']).pipe(
        take(1),
        mergeMap(albums => {
          if(albums) {
            return of(albums);
          } else {
            this.router.navigate(['/featured/browse']);
            return EMPTY;
          }
        })
      )
    )
  }
}
