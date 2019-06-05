import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album.component';
import { RouterModule } from '@angular/router';
import { TracksListModule } from '../shared/tracks-list/tracks-list.module';
import { AlbumPreviewModule } from '../shared/album-preview/album-preview.module';

@NgModule({
  declarations: [ AlbumComponent ],
  imports: [
    CommonModule,
    AlbumPreviewModule,
    TracksListModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: AlbumComponent
      }
    ])
  ]
})
export class AlbumModule { }
