import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { MissionService } from './mission.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    MissionService
  ]
})
export class StaticResourcesModule { }
