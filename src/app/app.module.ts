import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PathsService } from './api/eve-crest/paths.service';
import { ItemService } from './api/eve-crest/item.service';

import { SharedModule } from './shared/shared.module';

import { AboutComponent } from './about';
import { ImpressumComponent } from './impressum';
import { LegalComponent } from './legal';
import { NavbarComponent } from './navbar';
import { PageNotFoundComponent } from './page-not-found';

import { PilotAnalyzerComponent } from './pilot-analyzer';
import { AnyAlliancesPipe } from './pilot-analyzer/pilot-list/any-alliances.pipe';
import { DestroyedLostComponent } from './pilot-analyzer/destroyed-lost';
import { GroupcountPipe } from './pilot-analyzer/pilot-group-list/groupcount.pipe';
import { PilotGroupListComponent } from './pilot-analyzer/pilot-group-list';
import { PilotListComponent } from './pilot-analyzer/pilot-list';

import { OverviewComponent } from './overview';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    PilotAnalyzerComponent,
    AnyAlliancesPipe,
    DestroyedLostComponent,
    GroupcountPipe,
    PilotGroupListComponent,
    PilotListComponent,
    AboutComponent,
    ImpressumComponent,
    LegalComponent,
    NavbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    SharedModule
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
