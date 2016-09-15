import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FuzzworkMarketService } from '../../api/fuzzwork-market.service';

import { Item } from '../item';
import { CompressedPipe } from './compressed.pipe';

@Component({
  selector: 'app-mineable-table',
  templateUrl: 'mineable-table.component.html',
  styleUrls: ['mineable-table.component.scss'],
  pipes: [
    CompressedPipe
  ]
})
export class MineableTableComponent implements OnInit {
  // market groups
  // 54 ores
  // veldspar 518
  // pyroxeres 515
  // ice 1855
  // gas 983
  // whgas 1859
  @Input() items: any[];
  @Input() sell: boolean;
  @Input() pricearea: number;
  @Output() onSelect = new EventEmitter<Item>();

  private prices: any = {};

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService
  ) { }

  ngOnInit() {
  }

  select(id: number, amount = 1) {
    this.onSelect.emit({ id: id, amount: amount });
  }

  getPrice(id: number, area: number, isSell: boolean) {
    if (!this.prices[area]) { this.prices[area] = {}; }
    if (!this.prices[area][id] && this.prices[area][id] !== null) {
      this.prices[area][id] = null;
      this.fuzzworkMarketService.get([id], area)
        .map(prices => prices[id])
        .subscribe(price => this.prices[area][id] = price);
    }

    if (!this.prices[area][id]) {
      return 0;
    }else if (isSell)  {
      return this.prices[area][id].sell.percentile;
    } else {
      return this.prices[area][id].buy.percentile;
    }
  }
}
