import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksListComponent } from './tracks-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ TracksListComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ TracksListComponent ]
})
export class TracksListModule { }
