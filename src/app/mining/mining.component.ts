import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Subscription }          from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { MineableTableComponent } from './mineable-table';
import { MineralTableComponent } from './mineral-table';
import { DetailsComponent } from './details';

import { MarketGroupsService } from './../api/eve-crest/market-groups.service';
import { Item } from './item';
import { FuzzworkMarketService } from '../api/fuzzwork-market.service';
import { MineableService } from '../api/static-resources/mineable.service';
import { StackPriceService } from './stack-price.service';

@Component({
  selector: 'app-mining',
  templateUrl: 'mining.component.html',
  styleUrls: ['mining.component.scss'],
  providers: [
    MarketGroupsService,
    FuzzworkMarketService,
    MineableService,
    StackPriceService
  ],
  pipes: [
  ],
  directives: [
    MineableTableComponent,
    MineralTableComponent,
    DetailsComponent
  ]
})
export class MiningComponent implements OnInit, OnDestroy, DoCheck {
  detailsItem = new Item();
  private sub: Subscription;
  mineables: any[];
  allItems: any = {};
  enabled = {};

  enabledItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marketGroupsService: MarketGroupsService,
    private mineableService: MineableService
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        this.detailsItem.id = +params['id'];
        this.detailsItem.amount = params['amount'] ? +params['amount'] : 1;
      });

    this.mineableService.get()
      .subscribe(infos => {
        this.mineables = infos;
        Observable.of<number[]>(infos.map(i => i.id))
          .flatMap(ids => ids)
          .subscribe(id => this.marketGroupsService.directSubTypes(id)
            .subscribe(items => this.allItems[id] = items)
          );
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngDoCheck() {
    // TODO: only when changed
    if (this.allItems && this.enabled) {
      let ids = Object.keys(this.allItems);
      let filteredIds = ids.filter(i => this.enabled[i]);
      this.enabledItems = filteredIds.reduce((all, cur) => all.concat(this.allItems[cur]), []);
    } else {
      this.enabledItems = [];
    }
  }

  enable(id: number): void {
    this.enabled[id] = !this.enabled[id];
  }

  openDetails(item: Item) {
    let routeParams: any = {id: item.id};

    if (item.amount !== 1) {
      routeParams.amount = item.amount;
    }

    this.router.navigate([routeParams]);
  }

  closeDetails() {
    this.router.navigate([{}]);
  }
}
