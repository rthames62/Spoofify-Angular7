import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HeaderModule } from './header/header.module';
import { SidebarNavigationModule } from './sidebar-navigation/sidebar-navigation.module';
import { PlaybackModule } from './playback/playback.module';

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
    PlaybackModule
  ],
  providers: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
