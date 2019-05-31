import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaybackComponent } from './playback.component';

@NgModule({
  declarations: [ PlaybackComponent ],
  imports: [
    CommonModule
  ],
  exports: [ PlaybackComponent ]
})
export class PlaybackModule { }
