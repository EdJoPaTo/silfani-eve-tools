import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent, ImpressumComponent, LegalComponent, PageNotFoundComponent } from './core';
import { OverviewComponent } from './overview';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'pilot-analyzer', loadChildren: 'app/pilot-analyzer/pilot-analyzer.module#PilotAnalyzerModule' },
  { path: 'item-estimator', loadChildren: 'app/item-estimator/item-estimator.module#ItemEstimatorModule' },
  { path: 'clipboard-estimator', loadChildren: 'app/clipboard-estimator/clipboard-estimator.module#ClipboardEstimatorModule' },
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
