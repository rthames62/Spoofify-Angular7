import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class BrowserXhrService extends BrowserXhr {

  constructor() {
    super();
  }

  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;
    return <any>(xhr);
  }
}
