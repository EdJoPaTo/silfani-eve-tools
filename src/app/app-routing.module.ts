import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiningComponent } from './mining';
import { PilotAnalyzerComponent } from './pilot-analyzer';

import { OverviewComponent } from './core/overview';
import { AboutComponent } from './core/about';
import { LegalComponent } from './core/legal';
import { ImpressumComponent } from './core/impressum';
import { PageNotFoundComponent } from './core/page-not-found';

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
