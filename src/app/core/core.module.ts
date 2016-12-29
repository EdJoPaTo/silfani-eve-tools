import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about/about.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { LegalComponent } from './legal/legal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AboutComponent,
    ImpressumComponent,
    LegalComponent,
    PageNotFoundComponent
  ],
  exports: [
    AboutComponent,
    ImpressumComponent,
    LegalComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule { }
