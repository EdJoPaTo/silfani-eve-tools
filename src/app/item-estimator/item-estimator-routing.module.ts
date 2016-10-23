import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ItemEstimatorComponent } from './item-estimator.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ItemEstimatorComponent }
  ])],
  exports: [RouterModule]
})
export class ItemEstimatorRoutingModule {}
