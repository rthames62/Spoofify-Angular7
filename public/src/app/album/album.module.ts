import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album.component';
import { RouterModule } from '@angular/router';
import { AlbumLayoutModule } from '../shared/album-layout/album-layout.module';
import { AlbumResolverService } from './resolver/album-resolver.service';

@NgModule({
  declarations: [ AlbumComponent ],
  imports: [
    CommonModule,
    AlbumLayoutModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: AlbumComponent,
        resolve: {
          album: AlbumResolverService
        }
      }
    ])
  ]
})
export class AlbumModule { }
