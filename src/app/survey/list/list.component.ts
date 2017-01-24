import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { FuzzworkMarketService, TypeIdFromNameService } from '../../api/fuzzwork';
import { ItemTypesService } from '../../api/eve-crest';

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

  totalVolume: number = NaN;
  totalPrice: number = NaN;

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService,
    private itemTypesService: ItemTypesService,
    private typeIdFromNameService: TypeIdFromNameService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    Observable.from(this.entries)
      .flatMap(entry => this.volumeFromEntry(entry))
      .reduce((total, add) => total + add)
      .subscribe(volume => this.totalVolume = volume);

    Observable.from(this.entries)
      .flatMap(entry => this.priceFromEntry(entry, this.pricearea, this.isSell))
      .reduce((total, add) => total + add)
      .subscribe(price => this.totalPrice = price);
  }

  id(name: string): Observable<number> {
    return this.typeIdFromNameService.getId(name);
  }

  volume(id: number, amount = 1): Observable<number> {
    if (!id) { return Observable.of(NaN); }
    return this.itemTypesService.get(id)
      .map(info => info.volume * amount);
  }

  volumeFromEntry(entry: SurveyScannerEntry): Observable<number> {
    return this.id(entry.name)
      .flatMap(id => this.volume(id, entry.amount));
  }

  cycles(volume: number, amount: number): number {
    return volume / amount;
  }

  cyclesFromEntry(entry: SurveyScannerEntry, amount: number): Observable<number> {
    return this.volumeFromEntry(entry)
      .map(volume => volume / amount);
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
