import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getAverageRGB, getDataUri, fullColorHex, startDownload } from "../core/utils.js";

@Injectable({
  providedIn: 'root'
})
export class MainBackgroundService {
  defaultColor: string = '282828';
  backgroundColor: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultColor);
  backgroundColor$: Observable<any> = this.backgroundColor.asObservable();
  imageUri: string;

  constructor() { }

  updateBackgroundColor(url?: string): void {
    if(url) {
      this.getColorFromImage(url);
    } else {
      this.backgroundColor.next(this.defaultColor);
    }
  }

  getColorFromImage(url) {
    startDownload(url);
    getDataUri(url, (uri) => {
      const image = new Image(300, 300);
      image.src = uri;
      image.crossOrigin = '';
      setTimeout(() => {
        const rgb = getAverageRGB(image);
        const color = fullColorHex(rgb.r, rgb.g, rgb.b);
        
        this.backgroundColor.next(url ? color : this.defaultColor);
      }, 100);
    });
  }
}
