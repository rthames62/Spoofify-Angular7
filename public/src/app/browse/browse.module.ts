import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { RouterModule } from '@angular/router';
import { FeaturedComponent } from './featured/featured.component';
import { BrowseNavComponent } from './shared/browse-nav/browse-nav.component';
import { FeaturedResolverService } from './featured/resolver/featured-resolver.service';
import { GenresComponent } from './genres/genres.component';
import { GenresResolverService } from './genres/resolver/genres-resolver.service';
import { AlbumsListModule } from '../shared/albums-list/albums-list.module';

@NgModule({
  declarations: [ BrowseComponent, FeaturedComponent, BrowseNavComponent, GenresComponent ],
  imports: [
    CommonModule,
    AlbumsListModule,
    RouterModule.forChild([
      {
        path: 'featured',
        component: FeaturedComponent,
        resolve: {
          playlists: FeaturedResolverService
        }
      },
      {
        path: 'genres',
        component: GenresComponent,
        resolve: {
          genres: GenresResolverService
        }
      }
    ])
  ],
  exports: [ BrowseComponent ]
})
export class BrowseModule { }
