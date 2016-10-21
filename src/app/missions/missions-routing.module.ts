import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MissionsComponent } from './missions.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: MissionsComponent }
  ])],
  exports: [RouterModule]
})
export class MissionsRoutingModule {}
