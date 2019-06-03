import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { MainBackgroundService } from './main-background.service';
import { Album, Track } from '../types/spotify-types';

@Injectable({
  providedIn: 'root'
})
export class SpotifyConnectService {

  authHeaders: Headers = new Headers();
  authBody: Headers = new Headers();

  constructor(private http: Http, private backgroundService: MainBackgroundService) { }

  getBrowseCategories(): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/categories`).pipe(
      map((res: any) => JSON.parse(res._body).categories)
    )
  }

  getFeaturedPlaylists(): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/featured-playlists`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getRecommendations(): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/recommendations`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getPlaylistById(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/playlist/${id}`).pipe(
      map((res: any) => {
        let body = JSON.parse(res._body);
        this.backgroundService.updateBackgroundColor(body.images[0].url);
        return body;
      })
    )
  }

  getArtistById(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getArtistByTopTracks(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}/top-tracks`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getArtistAlbums(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}/albums`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getArtistAlbumSingles(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}/singles`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getArtistAlbumCompilations(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}/compilations`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getArtistAlbumAppearsOn(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}/appears-on`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }
}
