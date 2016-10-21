import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PathsService } from './api/eve-crest/paths.service';
import { ItemService } from './api/eve-crest/item.service';

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
    HttpModule
  ],
  providers: [
    PathsService,
    ItemService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
