import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { PathsService } from './api/eve-crest/paths.service';
import { ItemService } from './api/eve-crest/item.service';

import { IskPipe } from './isk.pipe';
import { ShortnumberPipe } from './shortnumber.pipe';
import { VolumePipe } from './volume.pipe';

import { AboutComponent } from './about/about.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { LegalComponent } from './legal/legal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PilotAnalyzerComponent } from './pilot-analyzer';
import { OverviewComponent } from './overview/overview.component';
import { MissionsComponent } from './missions/missions.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    PilotAnalyzerComponent,
    MissionsComponent,
    IskPipe,
    ShortnumberPipe,
    VolumePipe,
    AboutComponent,
    ImpressumComponent,
    LegalComponent,
    NavbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    PathsService,
    ItemService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
