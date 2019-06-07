import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { TopResultsComponent } from './top-results/top-results.component';
import { ArtistsComponent } from './artists/artists.component';
import { SongsComponent } from './songs/songs.component';
import { AlbumsComponent } from './albums/albums.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { TopResultsResolverService } from './top-results/resolver/top-results-resolver.service';
import { AlbumPreviewModule } from '../shared/album-preview/album-preview.module';
import { TracksListModule } from '../shared/tracks-list/tracks-list.module';
import { AlbumsListModule } from '../shared/albums-list/albums-list.module';

@NgModule({
  declarations: [ SearchComponent, TopResultsComponent, ArtistsComponent, SongsComponent, AlbumsComponent, PlaylistsComponent ],
  imports: [
    CommonModule,
    AlbumPreviewModule,
    TracksListModule,
    AlbumsListModule,
    RouterModule.forChild([
      {
        path: '',
        component: SearchComponent
      }
    ])
  ]
})
export class SearchModule { }
