import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

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
export class ItemEstimatorComponent implements OnInit, OnDestroy {
  input: string;
  private searchTerms = new Subject<string>();
  items: Item[] = [];
  private prices = {};
  private pricearea: number;
  private isSell = true;
  private sub: Subscription;
  private volumes = {};

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService,
    private itemTypesService: ItemTypesService,
    private parseItemLineService: ParseItemLineService,
    private route: ActivatedRoute,
    private router: Router,
    private typeIdFromNameService: TypeIdFromNameService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.isSell = params['pricetype'] !== 'buy';
      if (Number(params['pricearea']) > 0) {
        this.pricearea = Number(params['pricearea']);
      } else {
        this.pricearea = 60003760; // Jita IV - 4
      }
    });
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private updateUrl(): void {
    let params: any = {};
    if (!this.isSell) { params.pricetype = 'buy'; }
    if (Number(this.pricearea) !== 60003760) { params.pricearea = Number(this.pricearea); }
    this.router.navigate([params]);
  }

  private stackItems(currentStack: Item[], add: Item[]): Item[] {
    add.forEach(itemToAdd => {
      let indexOfExistingItem = currentStack.map(i => i.name).indexOf(itemToAdd.name);

      if (indexOfExistingItem >= 0) {
        currentStack[indexOfExistingItem].amount += itemToAdd.amount;
      } else {
        currentStack = currentStack.concat(itemToAdd);
      }
    });
    return currentStack;
  }

  private price(id: number, area: number, isSell: boolean): number {
    if (!this.prices[area]) { this.prices[area] = {}; }

    if (!this.prices[area][id] && this.prices[area][id] !== null) {
      this.prices[area][id] = null;
      this.fuzzworkMarketService.get([id], area)
        .subscribe(pricedata => this.prices[area][id] = pricedata[id]);
    }

    if (!this.prices[area][id]) { return null; }

    return this.prices[area][id][isSell ? 'sell' : 'buy'].percentile;
  }

  itemFromLineInfo(lineinfo: LineInfo): Observable<Item> {
    return this.typeIdFromNameService.getId(lineinfo.name)
      .map(id => ({ name: lineinfo.name, amount: lineinfo.amount, id: id }));
  }

  totalAmount(items: any[]): number { return items.reduce((sum, add) => sum + add.amount, 0); }
  totalPrice(items: any[], area: number, isSell: boolean): number {
    return items.reduce((sum, add) => sum + this.price(add.id, area, isSell) * add.amount, 0);
  }
  totalVolume(items: any[]): number { return items.reduce((sum, add) => sum + this.volumes[add.id] * add.amount, 0); }

  splitLines(input: string): string[] { return input.split('\n').filter(str => str); }
  search(term: string) { this.searchTerms.next(term); }
}
