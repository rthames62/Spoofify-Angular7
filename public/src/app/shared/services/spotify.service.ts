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
      map((categories: any) => JSON.parse(categories._body).categories)
    )
  }

  getFeaturedPlaylists(): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/featured-playlists`).pipe(
      map((categories: any) => JSON.parse(categories._body))
    )
  }

  getRecommendations(): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/recommendations`).pipe(
      map((recommendations: any) => JSON.parse(recommendations._body))
    )
  }

  getPlaylistById(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/playlist/${id}`).pipe(
      map((playlist: any) => {
        let body = JSON.parse(playlist._body);
        this.backgroundService.updateBackgroundColor(body.primary_color);
        return body;
      })
    )
  }

  getArtistById(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}`).pipe(
      map((artist: any) => JSON.parse(artist._body))
    )
  }

  getArtistByTopTracks(id: string): Observable<Track[]> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}/top-tracks`).pipe(
      map((tracks: any) => JSON.parse(tracks._body))
    )
  }

  getArtistAlbums(id: string): Observable<Album[]> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}/albums`).pipe(
      map((albums: any) => JSON.parse(albums._body))
    )
  }
}
