import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { PathsService } from './api/eve-crest/paths.service';
import { ItemService } from './api/eve-crest/item.service';

import { IskPipe } from './isk.pipe';
import { ShortnumberPipe } from './shortnumber.pipe';
import { VolumePipe } from './volume.pipe';

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

import { MissionsComponent } from './missions';
import { DetailedinfoPipe } from './missions/detailedinfo.pipe';
import { InfoiconPipe } from './missions/infoicon.pipe';
import { InfotitlePipe } from './missions/infotitle.pipe';
import { LevelFilterPipe } from './missions/level-filter.pipe';
import { MissionListComponent } from './missions/mission-list';
import { NameFilterPipe } from './missions/name-filter.pipe';

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
    MissionsComponent,
    DetailedinfoPipe,
    InfoiconPipe,
    InfotitlePipe,
    LevelFilterPipe,
    MissionListComponent,
    NameFilterPipe,
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
    appRoutingProviders,
    PathsService,
    ItemService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
