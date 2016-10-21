import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AutocompleteService } from './autocomplete.service';
import { ZKillStatsService } from './z-kill-stats.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    AutocompleteService,
    ZKillStatsService
  ]
})
export class ZKillboardModule { }
