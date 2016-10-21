import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PathsService } from './api/eve-crest/paths.service';
import { ItemService } from './api/eve-crest/item.service';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { NavbarComponent } from './navbar';

import { PilotAnalyzerComponent } from './pilot-analyzer';
import { AnyAlliancesPipe } from './pilot-analyzer/pilot-list/any-alliances.pipe';
import { DestroyedLostComponent } from './pilot-analyzer/destroyed-lost';
import { GroupcountPipe } from './pilot-analyzer/pilot-group-list/groupcount.pipe';
import { PilotGroupListComponent } from './pilot-analyzer/pilot-group-list';
import { PilotListComponent } from './pilot-analyzer/pilot-list';

import { MiningComponent } from './mining';
import { CompressedPipe } from './mining/mineable-table/compressed.pipe';
import { DetailsComponent } from './mining/details';
import { EnabledItemsPipe } from './mining/enabled-items.pipe';
import { ItemnameComponent } from './mining/details/itemname';
import { MineableTableComponent } from './mining/mineable-table';
import { MineralTableComponent } from './mining/mineral-table';
import { OrderPipe } from './mining/mineable-table/order.pipe';
import { PricetableComponent } from './mining/details/pricetable';
import { ReprocesstableComponent } from './mining/details/reprocesstable';

@NgModule({
  declarations: [
    AppComponent,
    MiningComponent,
    CompressedPipe,
    DetailsComponent,
    EnabledItemsPipe,
    ItemnameComponent,
    MineableTableComponent,
    MineralTableComponent,
    OrderPipe,
    PricetableComponent,
    ReprocesstableComponent,
    PilotAnalyzerComponent,
    AnyAlliancesPipe,
    DestroyedLostComponent,
    GroupcountPipe,
    PilotGroupListComponent,
    PilotListComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    HttpModule,
    SharedModule
  ],
  providers: [
    PathsService,
    ItemService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
