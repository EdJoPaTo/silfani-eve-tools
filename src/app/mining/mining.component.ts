import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Subscription }          from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { MineableTableComponent } from './mineable-table';
import { MineralTableComponent } from './mineral-table';
import { DetailsComponent } from './details';

import { IsIncludedPipe } from './is-included.pipe';

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
    IsIncludedPipe
  ],
  directives: [
    MineableTableComponent,
    MineralTableComponent,
    DetailsComponent
  ]
})
export class MiningComponent implements OnInit, OnDestroy {
  item = new Item();
  private sub: Subscription;
  mineables: any[];
  items: any = {};
  enabled = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private marketGroupsService: MarketGroupsService,
    private mineableService: MineableService
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        this.item.id = +params['id'];
        this.item.amount = params['amount'] ? +params['amount'] : 1;
      });

    this.mineableService.get()
      .subscribe(infos => {
        this.mineables = infos;
        Observable.of<number[]>(infos.map(i => i.id))
          .flatMap(ids => ids)
          .subscribe(id => this.marketGroupsService.directSubTypes(id)
            .subscribe(items => {
              // TODO: does this trigger the update?
              console.log(id, items);
              this.items[id] = items;
            })
          );
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  enable(id: number): void {
    this.enabled[id] = !this.enabled[id];
  }

  closeDetails() {
    this.router.navigate([{}]);
  }
}
