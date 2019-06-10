import { Injectable } from '@angular/core';
import { SpotifyConnectService } from 'src/app/shared/services/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresResolverService {

  constructor(private spotifyService: SpotifyConnectService, private router: Router) { }

  resolve(route: ActivatedRoute) {
    return this.spotifyService.getBrowseGenres().pipe(
      take(1),
      mergeMap(category => {
        if(category) {
          return of(category);
        } else {
          this.router.navigate(['/browse']);
          return EMPTY;
        }
      })
    )
  }
}
