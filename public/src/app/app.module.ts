import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HeaderModule } from './header/header.module';
import { SidebarNavigationModule } from './sidebar-navigation/sidebar-navigation.module';
import { PlaybackModule } from './playback/playback.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'browse',
    loadChildren: './browse/browse.module#BrowseModule',
    data: {
      preload: false
    }
  },
  { path: '', redirectTo: 'browse/featured', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HeaderModule,
    SidebarNavigationModule,
    PlaybackModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
