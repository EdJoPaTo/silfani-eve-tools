import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEstimatorRoutingModule } from './item-estimator-routing.module';
import { ItemEstimatorComponent } from './item-estimator.component';

import { SharedModule } from '../shared';
import { EveCrestModule } from '../api/eve-crest';
import { FuzzworkMarketModule } from '../api/fuzzwork-market';

@NgModule({
  imports: [
    CommonModule,
    EveCrestModule,
    FuzzworkMarketModule,
    ItemEstimatorRoutingModule,
    SharedModule
  ],
  declarations: [
    ItemEstimatorComponent
  ]
})
export class ItemEstimatorModule { }
