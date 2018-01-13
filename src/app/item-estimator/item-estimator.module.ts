import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEstimatorRoutingModule } from './item-estimator-routing.module';
import { ItemEstimatorComponent } from './item-estimator.component';

import { EsiModule } from '../api/esi';
import { FuzzworkModule } from '../api/fuzzwork';
import { SharedModule } from '../shared';
import { StaticResourcesModule } from '../api/static-resources';

import { ParseItemLineService } from './parse-item-line.service';

import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  imports: [
    CommonModule,
    EsiModule,
    FuzzworkModule,
    ItemEstimatorRoutingModule,
    SharedModule,
    StaticResourcesModule
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
