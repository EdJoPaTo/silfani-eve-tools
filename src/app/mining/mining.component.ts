import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Subscription }          from 'rxjs/Subscription';

import { MineableTableComponent } from './mineable-table';
import { MineralTableComponent } from './mineral-table';
import { DetailsComponent } from './details';

import { Item } from './item';
import { FuzzworkMarketService } from '../api/fuzzwork-market.service';
import { StackPriceService } from './stack-price.service';

@Component({
  selector: 'app-mining',
  templateUrl: 'mining.component.html',
  styleUrls: ['mining.component.scss'],
  providers: [
    FuzzworkMarketService,
    StackPriceService
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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        this.item.id = +params['id'];
        this.item.amount = params['amount'] ? +params['amount'] : 1;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeDetails() {
    this.router.navigate([{}]);
  }
}
