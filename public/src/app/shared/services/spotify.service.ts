import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyConnectService {

  authHeaders: Headers = new Headers();
  authBody: Headers = new Headers();

  constructor(private http: Http) { }

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
      map((recommendations: any) => JSON.parse(recommendations._body))
    )
  }
}
