import { Component, OnInit, Input } from '@angular/core';

import { ReprocessService } from '../../../api/static-resources/evedump/reprocess.service';
import { FuzzworkMarketService } from '../../../api/fuzzwork-market.service';
import { StackPriceService } from '../../stack-price.service';

@Component({
  selector: 'app-reprocesstable',
  templateUrl: 'reprocesstable.component.html',
  styleUrls: ['reprocesstable.component.scss'],
  providers: [
    ReprocessService
  ]
})
export class ReprocesstableComponent implements OnInit {
  @Input() id: number;
  @Input() amount: number;
  @Input() myAmount: number;
  reprocessed = [];
  prices: any;
  stackpriceBuy: number;
  stackpriceSell: number;

  constructor(
    private reprocessService: ReprocessService,
    private fuzzworkMarketService: FuzzworkMarketService,
    private stackPriceService: StackPriceService
  ) { }

  ngOnInit() {
    this.reprocessService.get(this.id).subscribe(reprocessed => {
      this.reprocessed = reprocessed;
      let ids = reprocessed.map(item => item.id);
      this.fuzzworkMarketService.get(ids).subscribe(prices => this.prices = prices);
      this.stackPriceService.sell(reprocessed).subscribe(data => this.stackpriceSell = data);
      this.stackPriceService.buy(reprocessed).subscribe(data => this.stackpriceBuy = data);
    });
  }
}
