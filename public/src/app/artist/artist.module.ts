import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist.component';
import { RouterModule } from '@angular/router';
import { ArtistResolverService } from './resolver/artist-resolver.service';
import { TracksListModule } from '../shared/tracks-list/tracks-list.module';
import { AlbumsListModule } from '../shared/albums-list/albums-list.module';
import { RelatedArtistsComponent } from './related-artists/related-artists.component';
import { RelatedArtistsResolverService } from './related-artists/resolver/related-artists-resolver.service';
import { OverviewComponent } from './overview/overview.component';
import { OverviewResolverService } from './overview/resolver/overview-resolver.service';

@NgModule({
  declarations: [ ArtistComponent, RelatedArtistsComponent, OverviewComponent ],
  imports: [
    CommonModule,
    TracksListModule,
    AlbumsListModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ArtistComponent,
        resolve: {
          artistData: ArtistResolverService
        },
        children: [
          {
            path: '',
            component: OverviewComponent,
            outlet: 'artist',
            resolve: {
              albums: OverviewResolverService
            }
          },
          {
            path: 'related',
            component: RelatedArtistsComponent,
            resolve: {
              artists: RelatedArtistsResolverService
            },
            outlet: 'artist'
          },
          {
            path: 'about',
            component: ArtistComponent,
            resolve: {
              artists: ArtistResolverService
            },
            outlet: 'artist'
          }
        ]
      }
    ])
  ],
  exports: [ RelatedArtistsComponent ]
})
export class ArtistModule { }
