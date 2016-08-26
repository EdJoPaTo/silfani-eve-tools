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

import { PilotAnalyzerComponent } from './pilot-analyzer';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    PilotAnalyzerComponent,
    OverviewComponent,
    AboutComponent,
    ImpressumComponent,
    LegalComponent,
    NavbarComponent
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
