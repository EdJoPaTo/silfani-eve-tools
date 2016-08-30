import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { AboutComponent } from './about/about.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { LegalComponent } from './legal/legal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PilotAnalyzerComponent } from './pilot-analyzer';
import { OverviewComponent } from './overview/overview.component';
import { MissionsComponent } from './missions/missions.component';
import { MiningComponent } from './mining/mining.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    MiningComponent,
    PilotAnalyzerComponent,
    MissionsComponent,
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
    appRoutingProviders
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
