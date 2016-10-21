import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PathsService } from './api/eve-crest/paths.service';
import { ItemService } from './api/eve-crest/item.service';

import { IskPipe } from './isk.pipe';
import { ShortnumberPipe } from './shortnumber.pipe';
import { VolumePipe } from './volume.pipe';

import { AboutComponent } from './about';
import { ImpressumComponent } from './impressum';
import { LegalComponent } from './legal';
import { NavbarComponent } from './navbar';
import { PageNotFoundComponent } from './page-not-found';

import { PilotAnalyzerComponent } from './pilot-analyzer';
import { AnyAlliancesPipe } from './pilot-analyzer/pilot-list/any-alliances.pipe';
import { DestroyedLostComponent } from './pilot-analyzer/destroyed-lost';
import { GroupcountPipe } from './pilot-analyzer/pilot-group-list/groupcount.pipe';
import { PilotGroupListComponent } from './pilot-analyzer/pilot-group-list';
import { PilotListComponent } from './pilot-analyzer/pilot-list';

import { OverviewComponent } from './overview';

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
    OverviewComponent,
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
    IskPipe,
    ShortnumberPipe,
    VolumePipe,
    AboutComponent,
    ImpressumComponent,
    LegalComponent,
    NavbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule
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
