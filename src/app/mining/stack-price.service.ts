import { Injectable } from '@angular/core';

import { FuzzworkMarketService } from '../api/fuzzwork';

@Injectable()
export class StackPriceService {

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService
  ) { }

  private get(items: any, area: number, buy: boolean) {
    let ids = items.map(item => item.id);
    return this.fuzzworkMarketService.get(ids, area)
      .map(prices => {
        let fullprice = 0;
        for (let i = 0; i < ids.length; i++) {
          let id = ids[i];
          let item = items.filter(o => o.id === id)[0];
          let amount = item.amount;
          let singleprice = prices[id][buy ? 'buy' : 'sell'].percentile;
          fullprice += singleprice * amount;
        }
        return fullprice;
      });
  }

  sell(items: any, area = 60003760) {
    return this.get(items, area, false);
  }

  buy(items: any, area = 60003760) {
    return this.get(items, area, true);
  }
}
