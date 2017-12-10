import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FuzzworkMarketService } from './fuzzwork-market.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    FuzzworkMarketService
  ]
})
export class FuzzworkModule { }
