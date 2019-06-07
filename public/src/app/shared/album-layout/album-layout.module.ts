import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumLayoutComponent } from './album-layout.component';
import { AlbumPreviewModule } from '../album-preview/album-preview.module';
import { TracksListModule } from '../tracks-list/tracks-list.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ AlbumLayoutComponent ],
  imports: [
    CommonModule,
    AlbumPreviewModule,
    TracksListModule,
    RouterModule
  ],
  exports: [ AlbumLayoutComponent ]
})
export class AlbumLayoutModule { }
