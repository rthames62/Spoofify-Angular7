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
import { GenreDetailsComponent } from './genres/genre-details/genre-details.component';
import { GenreDetailsResolverService } from './genres/genre-details/resolver/genre-details-resolver.service';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { NewReleasesResolverService } from './new-releases/resolver/new-releases-resolver.service';

@NgModule({
  declarations: [ BrowseComponent, FeaturedComponent, BrowseNavComponent, GenresComponent, GenreDetailsComponent, NewReleasesComponent ],
  imports: [
    CommonModule,
    AlbumsListModule,
    RouterModule.forChild([
      {
        path: '',
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
      },
      {
        path: 'genres/:id',
        component: GenreDetailsComponent,
        resolve: {
          playlists: GenreDetailsResolverService
        }
      },
      {
        path: 'new-releases',
        component: NewReleasesComponent,
        resolve: {
          newReleases: NewReleasesResolverService
        }
      }
    ])
  ],
  exports: [ BrowseComponent ]
})
export class BrowseModule { }
