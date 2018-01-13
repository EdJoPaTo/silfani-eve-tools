import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { EvedumpService } from './evedump.service';
import { MissionService } from './mission.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    EvedumpService,
    MissionService
  ]
})
export class StaticResourcesModule { }
