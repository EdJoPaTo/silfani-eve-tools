import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FuzzworkMarketService, TypeIdFromNameService } from '../../api/fuzzwork';

import { SurveyScannerEntry } from '../survey-scanner-entry';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() entries: SurveyScannerEntry[];

  @Input() pricearea: number;
  @Input() isSell = true;

  @Input() amount: number;
  @Input() miners: number;
  @Input() cycletime: number;
  @Input() range: number;

  @Output() error = new EventEmitter();

  totalVolume: number = NaN;
  totalPrice: number = NaN;

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService,
    private typeIdFromNameService: TypeIdFromNameService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    Observable.from(this.entries)
      .map(entry => entry.volume)
      .reduce((total, add) => total + add)
      .subscribe(volume => this.totalVolume = volume, error =>
        this.error.emit('CREST failed to respond properly.')
      );

    Observable.from(this.entries)
      .flatMap(entry => this.priceFromEntry(entry, this.pricearea, this.isSell))
      .reduce((total, add) => total + add)
      .subscribe(price => this.totalPrice = price, error =>
        this.error.emit('Fuzzwork Market Data failed to respond properly.')
      );
  }

  id(name: string): Observable<number> {
    return this.typeIdFromNameService.getId(name);
  }

  price(id: number, pricearea: number, isSell: boolean, amount = 1): Observable<number> {
    if (!id) { return Observable.of(NaN); }
    return this.fuzzworkMarketService.getSingle(id, pricearea)
      .map(data => data[isSell ? 'sell' : 'buy'])
      .map(pricedata => Number(pricedata.percentile * amount));
  }

  priceFromEntry(entry: SurveyScannerEntry, pricearea: number, isSell: boolean): Observable<number> {
    return this.id(entry.name)
      .flatMap(id => this.price(id, pricearea, isSell, entry.amount));
  }

  priceDetailsUrl(id: number, pricearea: number, isSell: boolean): string {
    return this.fuzzworkMarketService.detailsUrl(id, pricearea, isSell);
  }

}
