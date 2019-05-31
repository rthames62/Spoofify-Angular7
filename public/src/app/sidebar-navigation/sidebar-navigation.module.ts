import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavigationComponent } from './sidebar-navigation.component';

@NgModule({
  declarations: [ SidebarNavigationComponent ],
  imports: [
    CommonModule
  ],
  exports: [ SidebarNavigationComponent ]
})
export class SidebarNavigationModule { }
