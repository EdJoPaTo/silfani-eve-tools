import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about';
import { ImpressumComponent } from './impressum';
import { LegalComponent } from './legal';
import { OverviewComponent } from './overview';
import { PageNotFoundComponent } from './page-not-found';

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
