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
  defaultItems = [515, 516, 518, 519];
  enabled: any = {};

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
        let paramKeys = Object.keys(params);
        let enabled = {};
        this.defaultItems.forEach(defaultItem => enabled[defaultItem] = true);
        paramKeys.forEach(param => {
          if (param === 'id' || param === 'amount') {
            // already handled
          } else {
            enabled[param] = String(params[param]) === 'true';
          }
        });
        this.enabled = enabled;
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
    this.changeRoute(this.detailsItem, this.enabled);
  }

  changeRoute(item: Item, enabled: any) {
    let routeParams: any = {};

    if (item) {
      if (item.id) {
        routeParams.id = item.id;
      }

      if (item.amount !== 1) {
        routeParams.amount = item.amount;
      }
    }

    Object.keys(enabled)
      .map(enabledId => +enabledId)
      .forEach(enabledId => {
        let isDefault = this.defaultItems.indexOf(enabledId) >= 0;
        if ((enabled[enabledId] && !isDefault) || (!enabled[enabledId] && isDefault)) {
          routeParams[enabledId] = enabled[enabledId];
        }
      });

    this.router.navigate([routeParams]);
  }

  openDetails(item: Item) {
    this.changeRoute(item, this.enabled);
  }

  closeDetails() {
    this.openDetails(null);
  }
}
