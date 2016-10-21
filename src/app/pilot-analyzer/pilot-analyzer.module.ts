import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotAnalyzerRoutingModule } from './pilot-analyzer-routing.module';
import { PilotAnalyzerComponent } from './pilot-analyzer.component';

import { SharedModule } from '../shared';

import { AnyAlliancesPipe } from './pilot-list/any-alliances.pipe';
import { DestroyedLostComponent } from './destroyed-lost';
import { GroupcountPipe } from './pilot-group-list/groupcount.pipe';
import { PilotGroupListComponent } from './pilot-group-list';
import { PilotListComponent } from './pilot-list';

@NgModule({
  imports: [
    CommonModule,
    PilotAnalyzerRoutingModule,
    SharedModule
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
