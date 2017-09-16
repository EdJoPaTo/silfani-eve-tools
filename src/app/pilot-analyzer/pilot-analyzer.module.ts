import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotAnalyzerRoutingModule } from './pilot-analyzer-routing.module';
import { PilotAnalyzerComponent } from './pilot-analyzer.component';

import { EsiModule } from '../api/esi';
import { EveCrestModule } from '../api/eve-crest';
import { SharedModule } from '../shared';
import { ZKillboardModule } from '../api/z-killboard';

import { AnyAlliancesPipe } from './pilot-list/any-alliances.pipe';
import { DestroyedLostComponent } from './destroyed-lost';
import { GroupcountPipe } from './pilot-group-list/groupcount.pipe';
import { PilotGroupListComponent } from './pilot-group-list';
import { PilotListComponent } from './pilot-list';

@NgModule({
  imports: [
    CommonModule,
    EsiModule,
    EveCrestModule,
    PilotAnalyzerRoutingModule,
    SharedModule,
    ZKillboardModule
  ],
  declarations: [
    PilotAnalyzerComponent,
    AnyAlliancesPipe,
    DestroyedLostComponent,
    GroupcountPipe,
    PilotGroupListComponent,
    PilotListComponent
  ]
})
export class PilotAnalyzerModule { }
