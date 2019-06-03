import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist.component';
import { RouterModule } from '@angular/router';
import { ArtistResolverService } from './resolver/artist-resolver.service';
import { TracksListModule } from '../shared/tracks-list/tracks-list.module';
import { AlbumsListModule } from '../shared/albums-list/albums-list.module';

@NgModule({
  declarations: [ ArtistComponent ],
  imports: [
    CommonModule,
    TracksListModule,
    AlbumsListModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ArtistComponent,
        resolve: {
          artist: ArtistResolverService
        }
      },
      {
        path: ':id/related',
        component: ArtistComponent,
        resolve: {
          artist: ArtistResolverService
        }
      },
      {
        path: ':id/about',
        component: ArtistComponent,
        resolve: {
          artist: ArtistResolverService
        }
      }
    ])
  ]
})
export class ArtistModule { }
