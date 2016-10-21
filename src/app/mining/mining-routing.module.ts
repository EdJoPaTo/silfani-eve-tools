import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MiningComponent } from './mining.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: MiningComponent }
  ])],
  exports: [RouterModule]
})
export class MiningRoutingModule {}
