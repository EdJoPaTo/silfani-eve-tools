import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PilotAnalyzerComponent } from './pilot-analyzer.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: PilotAnalyzerComponent }
  ])],
  exports: [RouterModule]
})
export class PilotAnalyzerRoutingModule {}
