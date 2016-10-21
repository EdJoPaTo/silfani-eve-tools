import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview';
import { PilotAnalyzerComponent } from './pilot-analyzer';
import { MissionsComponent } from './missions';

import { AboutComponent } from './about';
import { LegalComponent } from './legal';
import { ImpressumComponent } from './impressum';
import { PageNotFoundComponent } from './page-not-found';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'pilot-analyzer', component: PilotAnalyzerComponent },
  { path: 'missions', component: MissionsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
