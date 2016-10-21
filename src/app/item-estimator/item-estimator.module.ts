import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEstimatorRoutingModule } from './item-estimator-routing.module';
import { ItemEstimatorComponent } from './item-estimator.component';

import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    ItemEstimatorRoutingModule,
    SharedModule
  ],
  declarations: [
    ItemEstimatorComponent
  ]
})
export class ItemEstimatorModule { }
