import { Injectable } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreDetailsResolverService {

  constructor(private spotifyService: SpotifyConnectService, private router: Router) { }

  resolve(route: ActivatedRoute) {
    return forkJoin(
      this.spotifyService.getBrowseCategoryById(route.params['id']).pipe(
        take(1),
        mergeMap(playlists => {
          if(playlists) {
            return of(playlists);
          } else {
            return EMPTY;
          }
        })
      ),
      this.spotifyService.getSingleCategoryById(route.params['id']).pipe(
        take(1),
        mergeMap(playlist => {
          if(playlist) {
            return of(playlist);
          } else {
            return EMPTY;
          }
        })
      )
    )
  }
}
