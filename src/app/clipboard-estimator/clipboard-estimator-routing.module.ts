import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClipboardEstimatorComponent } from './clipboard-estimator.component';

const routes: Routes = [
  { path: '', component: ClipboardEstimatorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClipboardEstimatorRoutingModule { }
