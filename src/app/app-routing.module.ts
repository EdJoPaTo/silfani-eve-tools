import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent, ImpressumComponent, LegalComponent, OverviewComponent, PageNotFoundComponent } from './core';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'mining', loadChildren: 'app/mining/mining.module#MiningModule' },
  { path: 'pilot-analyzer', loadChildren: 'app/pilot-analyzer/pilot-analyzer.module#PilotAnalyzerModule' },
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
