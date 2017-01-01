import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardEstimatorRoutingModule } from './clipboard-estimator-routing.module';
import { ClipboardEstimatorComponent } from './clipboard-estimator.component';

import { EsiModule } from '../api/esi';
import { EveCrestModule } from '../api/eve-crest';
import { FuzzworkModule } from '../api/fuzzwork';
import { SharedModule } from '../shared';
import { ZKillboardModule } from '../api/z-killboard';

@NgModule({
  imports: [
    CommonModule,
    ClipboardEstimatorRoutingModule,
    EsiModule,
    EveCrestModule,
    FuzzworkModule,
    SharedModule,
    ZKillboardModule
  ],
  declarations: [
    ClipboardEstimatorComponent
  ]
})
export class ClipboardEstimatorModule { }
