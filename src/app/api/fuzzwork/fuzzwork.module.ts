import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FuzzworkMarketService } from './fuzzwork-market.service';
import { TypeIdFromNameService } from './type-id-from-name.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    FuzzworkMarketService,
    TypeIdFromNameService
  ]
})
export class FuzzworkModule { }
