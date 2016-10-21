import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { EveCrestModule } from './api/eve-crest';
import { ZKillboardModule } from './api/z-killboard';

import { CoreModule } from './core';

import { NavbarComponent } from './navbar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    EveCrestModule,
    ZKillboardModule,
    HttpModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
