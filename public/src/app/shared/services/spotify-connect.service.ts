import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

interface SpotifyAuthBody {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyConnectService {

  authHeaders: Headers = new Headers();

  constructor(private http: Http) { }

  authorizeSpotify(): Observable<any> {
    return this.http.get(`${environment.serverBaseUrl}spotify/auth`).pipe(map((res) => {
      console.log(res);
    }))
  }
}
