import { Component, OnInit, Input } from '@angular/core';

import { FuzzworkMarketService } from '../../../api/fuzzwork-market.service';

@Component({
  selector: 'app-pricetable',
  templateUrl: 'pricetable.component.html',
  styleUrls: ['pricetable.component.scss']
})
export class PricetableComponent implements OnInit {
  @Input() id: number;
  @Input() amount: number;
  price: any;
  myAmount = 1;

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService
  ) { }

  ngOnInit() {
    this.fuzzworkMarketService.get([this.id])
      .map(data => data[this.id])
      .subscribe(data => this.price = data);
  }
}
