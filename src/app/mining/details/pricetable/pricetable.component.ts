import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { FuzzworkMarketService } from '../../../api/fuzzwork';

@Component({
  selector: 'app-pricetable',
  templateUrl: 'pricetable.component.html',
  styleUrls: ['pricetable.component.scss']
})
export class PricetableComponent implements OnInit, DoCheck {
  private idPriceLoadedFor: number;
  @Input() id: number;
  @Input() amount: number;
  @Input() myAmount: number;
  price: any;

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService
  ) { }

  ngOnInit() {
    this.loadPrice();
  }

  ngDoCheck() {
    if (this.id !== this.idPriceLoadedFor) {
      this.loadPrice();
    }
  }

  private loadPrice() {
    this.idPriceLoadedFor = this.id;
    this.fuzzworkMarketService.get([this.id])
      .map(data => data[this.id])
      .subscribe(data => this.price = data);
  }
}
