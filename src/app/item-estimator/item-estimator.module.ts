import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEstimatorRoutingModule } from './item-estimator-routing.module';
import { ItemEstimatorComponent } from './item-estimator.component';

import { SharedModule } from '../shared';
import { EsiModule } from '../api/esi';
import { EveCrestModule } from '../api/eve-crest';
import { FuzzworkModule } from '../api/fuzzwork';

import { ParseItemLineService } from './parse-item-line.service';

import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  imports: [
    CommonModule,
    EsiModule,
    EveCrestModule,
    FuzzworkModule,
    ItemEstimatorRoutingModule,
    SharedModule
  ],
  providers: [
    ParseItemLineService
  ],
  declarations: [
    ItemEstimatorComponent,
    ItemListComponent
  ]
})
export class ItemEstimatorModule { }
