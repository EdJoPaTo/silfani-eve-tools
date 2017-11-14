import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AllianceInformationService } from './alliance-information.service';
import { ItemService } from './item.service';
import { PathsService } from './paths.service';
import { RegionService } from './region.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    AllianceInformationService,
    ItemService,
    PathsService,
    RegionService
  ]
})
export class EveCrestModule { }
