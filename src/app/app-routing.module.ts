import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview';
import { MiningComponent } from './mining';
import { PilotAnalyzerComponent } from './pilot-analyzer';

import { AboutComponent } from './about';
import { LegalComponent } from './legal';
import { ImpressumComponent } from './impressum';
import { PageNotFoundComponent } from './page-not-found';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'mining', component: MiningComponent },
  { path: 'pilot-analyzer', component: PilotAnalyzerComponent },
  { path: 'missions', loadChildren: 'app/missions/missions.module#MissionsModule' },
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
