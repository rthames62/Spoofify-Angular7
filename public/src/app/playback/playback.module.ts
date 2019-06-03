import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaybackComponent } from './playback.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ PlaybackComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ PlaybackComponent ]
})
export class PlaybackModule { }
