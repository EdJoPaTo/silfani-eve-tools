import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SearchService } from './search.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    SearchService
  ]
})
export class EsiModule { }
