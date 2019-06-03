import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsListComponent } from './albums-list.component';
import { RouterModule } from '@angular/router';
import { AlbumPreviewModule } from '../album-preview/album-preview.module';

@NgModule({
  declarations: [ AlbumsListComponent ],
  imports: [
    CommonModule,
    AlbumPreviewModule,
    RouterModule
  ],
  exports: [ AlbumsListComponent ]
})
export class AlbumsListModule { }
