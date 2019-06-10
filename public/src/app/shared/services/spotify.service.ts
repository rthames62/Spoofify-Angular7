import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from 'src/environments/environment';
import { Observable, interval } from 'rxjs';
import { map, throttle, throttleTime } from "rxjs/operators";
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

  getBrowseCategoryById(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/browse/category/${id}/playlists`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getSingleCategoryById(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/browse/category/${id}`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getFeaturedPlaylists(): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/featured-playlists`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getNewReleases(): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/browse/new-releases`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getBrowseGenres(): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/browse/categories`).pipe(
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

  getArtistRelatedArtists(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/artist/${id}/related-artists`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  getAlbumById(id: string): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/album/${id}`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }

  searchSpotify(q): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}/spotify/search/${q}`).pipe(
      map((res: any) => JSON.parse(res._body))
    )
  }
}
