import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ZKillStatsService } from './z-kill-stats.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    ZKillStatsService
  ]
})
export class ZKillboardModule { }
