import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainBackgroundService {
  defaultColor: string = '#383838';
  backgroundColor: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultColor);
  backgroundColor$: Observable<any> = this.backgroundColor.asObservable();

  constructor() { }

  updateBackgroundColor(hex: string): void {
    this.backgroundColor.next(hex ? hex : this.defaultColor);
  }
}
