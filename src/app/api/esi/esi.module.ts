import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SearchService } from './search.service';
import { TypeInformationService } from './type-information.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    SearchService,
    TypeInformationService
  ]
})
export class EsiModule { }
