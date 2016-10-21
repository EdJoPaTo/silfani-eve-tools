import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AllianceInformationService } from './alliance-information.service';
import { ItemService } from './item.service';
import { ItemTypesService } from './item-types.service';
import { MarketGroupsService } from './market-groups.service';
import { PathsService } from './paths.service';
import { TimeService } from './time.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    AllianceInformationService,
    ItemService,
    ItemTypesService,
    MarketGroupsService,
    PathsService,
    TimeService
  ]
})
export class EveCrestModule { }
