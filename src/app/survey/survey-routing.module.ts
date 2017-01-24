import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyComponent } from './survey.component';

const routes: Routes = [
  {path: '', component: SurveyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SurveyRoutingModule { }
