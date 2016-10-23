import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { MineableService } from './mineable.service';
import { MissionService } from './mission.service';
import { ReprocessService } from './evedump/reprocess.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    MineableService,
    MissionService,
    ReprocessService
  ]
})
export class StaticResourcesModule { }
