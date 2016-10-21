import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { EveCrestModule } from './api/eve-crest';
import { ZKillboardModule } from './api/z-killboard';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import { NavbarComponent } from './navbar';

import { PilotAnalyzerComponent } from './pilot-analyzer';
import { AnyAlliancesPipe } from './pilot-analyzer/pilot-list/any-alliances.pipe';
import { DestroyedLostComponent } from './pilot-analyzer/destroyed-lost';
import { GroupcountPipe } from './pilot-analyzer/pilot-group-list/groupcount.pipe';
import { PilotGroupListComponent } from './pilot-analyzer/pilot-group-list';
import { PilotListComponent } from './pilot-analyzer/pilot-list';

@NgModule({
  declarations: [
    AppComponent,
    PilotAnalyzerComponent,
    AnyAlliancesPipe,
    DestroyedLostComponent,
    GroupcountPipe,
    PilotGroupListComponent,
    PilotListComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    EveCrestModule,
    ZKillboardModule,
    HttpModule,
    SharedModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
