import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'browse',
    loadChildren: './browse/browse.module#BrowseModule',
    data: {
      preload: false
    }
  },
  {
    path: 'playlist',
    loadChildren: './playlist/playlist.module#PlaylistModule',
    data: {
      preload: false
    }
  },
  {
    path: 'artist',
    loadChildren: './artist/artist.module#ArtistModule',
    data: {
      preload: false
    }
  },
  {
    path: 'album',
    loadChildren: './album/album.module#AlbumModule',
    data: {
      preload: false
    }
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule',
    data: {
      preload: false
    }
  },
  { path: '', redirectTo: 'browse', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
