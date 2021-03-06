import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { FuzzworkMarketService } from '../../api/fuzzwork';
import { UniverseTypesService } from '../../api/esi';

import { Item } from '../item';

function arraysEqual(a: Item[], b: Item[]): boolean {
  if (a === b) { return true; }
  if (a == null || b == null) { return false; }
  if (a.length !== b.length) { return false; }

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (let i = 0; i < a.length; ++i) {
    if (a[i].id !== b[i].id) { return false; }
    if (a[i].amount !== b[i].amount) { return false; }
  }
  return true;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnChanges {
  @Input() items: Item[];
  @Input() pricearea: number;
  @Input() isSell: boolean;
  private lastItems: Item[] = [];
  private lastPricearea = 0;
  private lastIsSell = false;

  private itemSubject = new Subject<Item[]>();
  totalAmount: Observable<number>;
  totalVolume: Observable<number>;
  totalPrice: Observable<number>;

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService,
    private universeTypesService: UniverseTypesService,
  ) { }

  ngOnInit() {
    this.totalAmount = this.itemSubject
      .switchMap(items => Observable.of<number>(
        items.reduce((sum, add) => sum + add.amount, 0)
      ))
      .share();

    this.totalPrice = this.itemSubject
      .switchMap(items => Observable.from(items)
        .flatMap(item => this.price(item.id, this.pricearea, this.isSell, item.amount))
        .reduce((a, b) => a + b)
      )
      .share();

    this.totalVolume = this.itemSubject
      .switchMap(items => Observable.from(items)
        .flatMap(item => this.volume(item.id, item.amount))
        .reduce((a, b) => a + b)
      )
      .share();
  }

  ngOnChanges(): void {
    if (this.items == null) { return; }

    if (this.pricearea !== this.lastPricearea ||
      this.isSell !== this.lastIsSell ||
      !arraysEqual(this.items, this.lastItems)) {
      this.lastPricearea = this.pricearea;
      this.lastIsSell = this.isSell;
      this.lastItems = this.items.slice(0);

      this.itemSubject.next(this.items);
    }
  }

  fuzzworkMarketUrl(id: number, area: number, isSell: boolean): string {
    return this.fuzzworkMarketService.detailsUrl(id, area, isSell);
  }

  panedenUrl(id: number, isSell: boolean): string {
    return `https://www.paneden.com/types/${id}#${isSell ? 'sell' : 'buy'}`;
  }

  price(id: number, area: number, isSell: boolean, amount = 1): Observable<number> {
    return this.fuzzworkMarketService.getSingle(id, area)
      .map(data => data[isSell ? 'sell' : 'buy'])
      .map(pricedata => Number(pricedata.percentile))
      .map(single => single * amount);
  }

  volume(id: number, amount = 1): Observable<number> {
    return this.universeTypesService.get(id)
      .map(typeinfo => typeinfo.volume)
      .map(single => single * amount);
  }
}
