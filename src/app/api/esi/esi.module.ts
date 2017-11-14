import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SearchService } from './search.service';
import { UniverseTypesService } from './universe-types.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    SearchService,
    UniverseTypesService
  ]
})
export class EsiModule { }
