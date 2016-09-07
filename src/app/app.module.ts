import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { IskPipe } from './isk.pipe';
import { ShortnumberPipe } from './shortnumber.pipe';
import { VolumePipe } from './volume.pipe';

import { AboutComponent } from './about';
import { ImpressumComponent } from './impressum';
import { LegalComponent } from './legal';
import { NavbarComponent } from './navbar';
import { PageNotFoundComponent } from './page-not-found';

import { PilotAnalyzerComponent } from './pilot-analyzer';
import { OverviewComponent } from './overview';
import { MissionsComponent } from './missions';

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
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
