import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavigationComponent } from './sidebar-navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ SidebarNavigationComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ SidebarNavigationComponent ]
})
export class SidebarNavigationModule { }
