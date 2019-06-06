import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumLayoutComponent } from './album-layout.component';
import { AlbumPreviewModule } from '../album-preview/album-preview.module';
import { TracksListModule } from '../tracks-list/tracks-list.module';

@NgModule({
  declarations: [ AlbumLayoutComponent ],
  imports: [
    CommonModule,
    AlbumPreviewModule,
    TracksListModule
  ],
  exports: [ AlbumLayoutComponent ]
})
export class AlbumLayoutModule { }
