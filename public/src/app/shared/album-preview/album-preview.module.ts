import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumPreviewComponent } from './album-preview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ AlbumPreviewComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ AlbumPreviewComponent ]
})
export class AlbumPreviewModule { }
