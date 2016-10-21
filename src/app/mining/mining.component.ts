import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { ItemTypesService, MarketGroupsService } from '../api/eve-crest';
import { Item } from './item';
import { FuzzworkMarketService } from '../api/fuzzwork-market';
import { MineableService } from '../api/static-resources/mineable.service';
import { StackPriceService } from './stack-price.service';

@Component({
  selector: 'app-mining',
  templateUrl: 'mining.component.html',
  styleUrls: ['mining.component.scss'],
  providers: [
    ItemTypesService,
    MarketGroupsService,
    FuzzworkMarketService,
    MineableService,
    StackPriceService
  ]
})
export class MiningComponent implements OnInit, OnDestroy {
  detailsItem = new Item();
  private sub: Subscription;
  marketOrderType: string = 'buy';
  mineables: any[];
  allItems: any = {};
  defaultItems = [515, 516, 518, 519];
  enabled: any = {};

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
        this.marketOrderType = params['order'] === 'sell' ? 'sell' : 'buy';
        let paramKeys = Object.keys(params);
        let enabled = {};
        this.defaultItems.forEach(defaultItem => enabled[defaultItem] = true);
        paramKeys.forEach(param => {
          if (param === 'id' || param === 'amount' || param === 'order') {
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

  enable(id: number): void {
    this.enabled[id] = !this.enabled[id];
    this.changeRoute(this.detailsItem, this.enabled, this.marketOrderType);
  }

  setMarketOrderType(type: string) {
    this.changeRoute(this.detailsItem, this.enabled, type);
  }

  changeRoute(item: Item, enabled: any, marketOrderType: string) {
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

    if (marketOrderType === 'sell') {
      routeParams.order = 'sell';
    }

    this.router.navigate([routeParams]);
  }

  openDetails(item: Item) {
    this.changeRoute(item, this.enabled, this.marketOrderType);
  }

  closeDetails() {
    this.openDetails(null);
  }
}
