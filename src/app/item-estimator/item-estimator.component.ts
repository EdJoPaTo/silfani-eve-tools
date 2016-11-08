import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs/Rx';

import { FuzzworkMarketService, TypeIdFromNameService } from '../api/fuzzwork';
import { ItemTypesService, RegionService } from '../api/eve-crest';
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
  initialContent: string = `3.000  Veldspar
2  Logic Circuit
XR-3200 Heavy Missile Bay
Fried Interface Circuit  30  Salvaged Materials  0,30 m3
Power Circuit  2  Salvaged Materials  0,02 m3
Sisters Core Scanner Probe  8  Scanner Probe  0,80 m3
`;
  private search = new Subject<string[]>();
  items: Item[] = [];
  private pricearea: number;
  private isSell = true;
  private sub: Subscription;

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService,
    private itemTypesService: ItemTypesService,
    private parseItemLineService: ParseItemLineService,
    private regionService: RegionService,
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
    this.search
      .subscribe(lines => {
        let clear = true;
        Observable.from(lines)
          .map(line => this.parseItemLineService.parse(line))
          .reduce(this.stackItems)
          .flatMap(itemStack => itemStack)
          .filter((li: LineInfo) => li ? true : false)
          .flatMap((li: LineInfo) => this.itemFromLineInfo(li))
          .subscribe(item => {
            if (!item) { return; }
            if (clear) {
              clear = false;
              this.items = [];
            }
            this.items = this.items.concat([item]);
          }
          );
      });
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

  private price(id: number, area: number, isSell: boolean): Observable<number> {
    return this.fuzzworkMarketService.getSingle(id, area)
      .map(data => data[isSell ? 'sell' : 'buy'])
      .map(pricedata => Number(pricedata.percentile));
  }

  private volume(id: number): Observable<number> {
    return this.itemTypesService.get(id)
      .map(typeinfo => typeinfo.volume);
  }

  itemFromLineInfo(lineinfo: LineInfo): Observable<Item> {
    let s = new ReplaySubject<Item>();
    this.typeIdFromNameService.getId(lineinfo.name)
      .map(id => ({ name: lineinfo.name, amount: lineinfo.amount, id: id }))
      .subscribe((i: Item) => {
        s.next(i);
        s.complete();
      });
    return s;
  }

  totalAmount(items: any[]): number { return items.reduce((sum, add) => sum + add.amount, 0); }
  totalPrice(items: any[], area: number, isSell: boolean): Observable<number> {
    return Observable.from(items)
      .flatMap(item => {
        let s = new ReplaySubject();
        this.price(item.id, area, isSell)
          .subscribe(data => {
            s.next(data * item.amount);
            s.complete();
          }, err => s.error(err));
        return s;
      })
      .reduce((a, b) => a + b);
  }
  totalVolume(items: any[]): Observable<number> {
    return Observable.from(items)
      .flatMap(item => {
        let s = new ReplaySubject();
        this.volume(item.id)
          .subscribe(data => {
            s.next(data * item.amount);
            s.complete();
          }, err => s.error(err));
        return s;
      })
      .reduce((a, b) => a + b);
  }
}
