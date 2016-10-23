import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { FuzzworkMarketService, TypeIdFromNameService } from '../api/fuzzwork';
import { ItemTypesService } from '../api/eve-crest';
import { ParseItemLineService } from './parse-item-line.service';

import { LineInfo } from './line-info';
import { Item } from './item';

@Component({
  selector: 'app-item-estimator',
  templateUrl: './item-estimator.component.html',
  styleUrls: ['./item-estimator.component.scss'],
  providers: [
    ParseItemLineService
  ]
})
export class ItemEstimatorComponent implements OnInit {
  input: string;
  private searchTerms = new Subject<string>();
  items: Item[] = [];
  private prices = {};
  private volumes = {};

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService,
    private itemTypesService: ItemTypesService,
    private parseItemLineService: ParseItemLineService,
    private typeIdFromNameService: TypeIdFromNameService
  ) { }

  ngOnInit() {
    this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .map(this.splitLines)
      .subscribe(lines => {
        let clear = true;
        Observable.of<string[]>(lines)
          .flatMap(a => a)
          .map(line => this.parseItemLineService.parse(line))
          .reduce(this.stackItems)
          .flatMap(itemStack => itemStack)
          .flatMap(li => li ? this.itemFromLineInfo(li) : Observable.of<Item>(null))
          .subscribe(item => {
            if (!item) { return; }
            if (!this.prices[item.id]) {
              // TODO: pricearea in GUI
              this.fuzzworkMarketService.get([item.id])
                .subscribe(pricedata => this.prices[item.id] = pricedata[item.id]);
            }
            if (!this.volumes[item.id]) {
              this.itemTypesService.get(item.id)
                .map(typeinfo => typeinfo.volume)
                .subscribe(volume => this.volumes[item.id] = volume);
            }
            if (clear) {
              clear = false;
              this.items = [];
            }
            this.items = this.items.concat([item]);
          }
          );
      });

    this.input = `3.000  Veldspar
2  Logic Circuit
XR-3200 Heavy Missile Bay
Fried Interface Circuit  30  Salvaged Materials  0,30 m3
Power Circuit  2  Salvaged Materials  0,02 m3
Sisters Core Scanner Probe  8  Scanner Probe  0,80 m3
`;
    this.search(this.input);
  }

  private stackItems(currentStack: Item[], add: Item[]): Item[] {
    add.forEach(itemToAdd => {
      // TODO: stack already existing Items instead of adding them
      currentStack = currentStack.concat(itemToAdd);
    });
    return currentStack;
  }

  private price(id: number, isBuy = true): number {
    if (!this.prices[id]) { return null; }

    return this.prices[id][isBuy ? 'buy' : 'sell'].percentile;
  }

  itemFromLineInfo(lineinfo: LineInfo): Observable<Item> {
    return this.typeIdFromNameService.getId(lineinfo.name)
      .map(id => ({ name: lineinfo.name, amount: lineinfo.amount, id: id }));
  }

  totalAmount(items: any[]): number { return items.reduce((sum, add) => sum + add.amount, 0); }
  totalPrice(items: any[]): number { return items.reduce((sum, add) => sum + this.price(add.id) * add.amount, 0); }
  totalVolume(items: any[]): number { return items.reduce((sum, add) => sum + this.volumes[add.id] * add.amount, 0); }

  splitLines(input: string): string[] { return input.split('\n').filter(str => str); }
  search(term: string) { this.searchTerms.next(term); }
}
