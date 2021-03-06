import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { EvedumpService } from '../api/static-resources';
import { FuzzworkMarketService } from '../api/fuzzwork';
import { ParseItemLineService } from './parse-item-line.service';
import { SearchService } from '../api/esi';

import { LineInfo } from './line-info';
import { Item } from './item';

@Component({
  selector: 'app-item-estimator',
  templateUrl: './item-estimator.component.html',
  styleUrls: ['./item-estimator.component.scss']
})
export class ItemEstimatorComponent implements OnInit, OnDestroy {
  initialContent = `3,000  Veldspar
2  Logic Circuit
XR-3200 Heavy Missile Bay
Fried Interface Circuit  30  Salvaged Materials  0.30 m3
Power Circuit  2  Salvaged Materials  0.02 m3
Sisters Core Scanner Probe  8  Scanner Probe  0.80 m3
`;
  search = new Subject<string[]>();
  items: Observable<Item[]>;
  pricearea: number;
  isSell = true;
  private sub: Subscription;

  allStackItems: number = 0;
  currentLoadedStackItems: number = 0;
  regions: Observable<any[]>;

  constructor(
    private evedumpService: EvedumpService,
    private fuzzworkMarketService: FuzzworkMarketService,
    private parseItemLineService: ParseItemLineService,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
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

    this.items = this.search
      .map(lines => { this.currentLoadedStackItems = 0; this.allStackItems = 0; return lines; })
      .switchMap(lines => Observable.from(lines)
        .map(line => this.parseItemLineService.parse(line))
        .reduce(this.stackItems)
        .map((lis: LineInfo[]) => { this.allStackItems = lis.length; return lis; })
        .flatMap(lineInfoStack => lineInfoStack)
        .filter((li: LineInfo) => li ? true : false)
        .flatMap(li => this.itemFromLineInfo(li))
        .map((i: Item) => { this.currentLoadedStackItems++; return i; })
        .reduce((cur: Item[], add: Item) => cur.concat(add), [])
      )
      .share();

    this.regions = this.evedumpService.regionArr()
      .share();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateUrl(): void {
    const params: any = {};
    if (!this.isSell) { params.pricetype = 'buy'; }
    if (Number(this.pricearea) !== 60003760) { params.pricearea = Number(this.pricearea); }
    this.router.navigate([params]);
  }

  private stackItems(currentStack: LineInfo[], add: LineInfo[]): LineInfo[] {
    add.forEach(itemToAdd => {
      const indexOfExistingItem = currentStack.map(i => i.name).indexOf(itemToAdd.name);

      if (indexOfExistingItem >= 0) {
        currentStack[indexOfExistingItem].amount += itemToAdd.amount;
      } else {
        currentStack = currentStack.concat(itemToAdd);
      }
    });
    return currentStack;
  }

  itemFromLineInfo(lineinfo: LineInfo): Observable<Item> {
    return this.searchService.inventorytype(lineinfo.name, true)
      .map(array => array[0] || 0)
      .map(id => ({ name: lineinfo.name, amount: lineinfo.amount, id: id }));
  }

  getStations() {
    return this.fuzzworkMarketService.stations;
  }
}
