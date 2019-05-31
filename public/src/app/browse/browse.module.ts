import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse.component';
import { RouterModule } from '@angular/router';
import { FeaturedComponent } from './featured/featured.component';
import { BrowseNavComponent } from './shared/browse-nav/browse-nav.component';

@NgModule({
  declarations: [ BrowseComponent, FeaturedComponent, BrowseNavComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'featured', component: FeaturedComponent }
    ])
  ],
  exports: [ BrowseComponent ]
})
export class BrowseModule { }
