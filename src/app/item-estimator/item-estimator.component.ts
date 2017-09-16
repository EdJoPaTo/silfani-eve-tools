import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

import { FuzzworkMarketService, TypeIdFromNameService } from '../api/fuzzwork';
import { ItemTypesService, RegionService } from '../api/eve-crest';
import { ParseItemLineService } from './parse-item-line.service';

import { LineInfo } from './line-info';
import { Item } from './item';

@Component({
  selector: 'app-item-estimator',
  templateUrl: './item-estimator.component.html',
  styleUrls: ['./item-estimator.component.scss']
})
export class ItemEstimatorComponent implements OnInit, OnDestroy {
  initialContent: string = `3.000  Veldspar
2  Logic Circuit
XR-3200 Heavy Missile Bay
Fried Interface Circuit  30  Salvaged Materials  0,30 m3
Power Circuit  2  Salvaged Materials  0,02 m3
Sisters Core Scanner Probe  8  Scanner Probe  0,80 m3
`;
  search = new Subject<string[]>();
  items: Observable<Item[]>;
  pricearea: number;
  isSell = true;
  private sub: Subscription;

  allStackItems: number = 0;
  currentLoadedStackItems: number = 0;

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

    this.items = this.search
      .map(line => { this.currentLoadedStackItems = 0; this.allStackItems = 0; return line; })
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
    return this.typeIdFromNameService.getId(lineinfo.name)
      .map(id => ({ name: lineinfo.name, amount: lineinfo.amount, id: id }));
  }

  getStations() {
    return this.fuzzworkMarketService.stations;
  }

  getRegions() {
    return this.regionService.get();
  }
}
