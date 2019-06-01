import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksListComponent } from './tracks-list.component';

@NgModule({
  declarations: [ TracksListComponent ],
  imports: [
    CommonModule
  ],
  exports: [ TracksListComponent ]
})
export class TracksListModule { }
