import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';
import { RouterModule } from '@angular/router';
import { PlaylistResolverService } from './resolver/playlist-resolver.service';
import { AlbumLayoutModule } from '../shared/album-layout/album-layout.module';

@NgModule({
  declarations: [PlaylistComponent],
  imports: [
    CommonModule,
    AlbumLayoutModule,
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
