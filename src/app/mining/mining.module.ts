import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiningRoutingModule } from './mining-routing.module';
import { MiningComponent } from './mining.component';

import { EveCrestModule } from '../api/eve-crest';
import { SharedModule } from '../shared';

import { CompressedPipe } from './mineable-table/compressed.pipe';
import { DetailsComponent } from './details';
import { EnabledItemsPipe } from './enabled-items.pipe';
import { ItemnameComponent } from './details/itemname';
import { MineableTableComponent } from './mineable-table';
import { MineralTableComponent } from './mineral-table';
import { OrderPipe } from './mineable-table/order.pipe';
import { PricetableComponent } from './details/pricetable';
import { ReprocesstableComponent } from './details/reprocesstable';

@NgModule({
  imports: [
    CommonModule,
    EveCrestModule,
    MiningRoutingModule,
    SharedModule
  ],
  declarations: [
    MiningComponent,
    CompressedPipe,
    DetailsComponent,
    EnabledItemsPipe,
    ItemnameComponent,
    MineableTableComponent,
    MineralTableComponent,
    OrderPipe,
    PricetableComponent,
    ReprocesstableComponent
  ]
})
export class MiningModule { }
