import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about/about.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { LegalComponent } from './legal/legal.component';
import { OverviewComponent } from './overview/overview.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AboutComponent,
    ImpressumComponent,
    LegalComponent,
    OverviewComponent,
    PageNotFoundComponent
  ],
  exports: [
    AboutComponent,
    ImpressumComponent,
    LegalComponent,
    OverviewComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule {

  // https://angular.io/docs/ts/latest/guide/ngmodule.html#!#prevent-reimport
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
