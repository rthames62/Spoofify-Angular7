import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';
import { RouterModule } from '@angular/router';
import { PlaylistResolverService } from './resolver/playlist-resolver.service';
import { TracksListModule } from '../shared/tracks-list/tracks-list.module';
import { AlbumPreviewModule } from '../shared/album-preview/album-preview.module';

@NgModule({
  declarations: [PlaylistComponent],
  imports: [
    CommonModule,
    TracksListModule,
    AlbumPreviewModule,
    RouterModule.forChild([
      { 
        path: ':id',
        component: PlaylistComponent,
        resolve: {
          playlist: PlaylistResolverService
        }
      }
    ])
  ]
})
export class PlaylistModule { }
