import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { FuzzworkMarketService } from '../api/fuzzwork';
import { RegionService } from '../api/eve-crest';
import { SearchService } from '../api/esi';

import { SurveyScannerEntry } from './survey-scanner-entry';

const SURVEY_SCANNER_REGEX = /(.+)\s+([,\d]+)\s+([,\d]+) m3\s+([,\d]+ k?)m/;

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  initialContent = `Concentrated Veldspar  21,069  2,106 m3  4,631 m
Concentrated Veldspar  23,434  2,343 m3  5,635 m
Concentrated Veldspar  23,835  2,383 m3  12 km
Concentrated Veldspar  26,247  2,624 m3  17 km
Condensed Scordite  10,279  1,541 m3  4,866 m
Condensed Scordite  5,079  761 m3  16 km
Condensed Scordite  13,102  1,965 m3  19 km
Dense Veldspar  24,665  2,466 m3  7,990 m
Dense Veldspar  18,297  1,829 m3  12 km
Massive Scordite  9,912  1,486 m3  5,433 m
Massive Scordite  10,976  1,646 m3  8,845 m
Scordite  9,921  1,488 m3  15 km
Scordite  9,885  1,482 m3  18 km
Veldspar  22,286  2,228 m3  8,794 m
Veldspar  28,582  2,858 m3  14 km`;
  search = new Subject<string[]>();
  entries: Observable<SurveyScannerEntry[]>;
  pricearea: number;
  isSell = true;
  private sub: Subscription;

  amount: number;
  miners: number;
  cycletime: number;
  range: number;

  error: string;

  totalVolume: Observable<number>;

  private idFromNameCache = {};

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService,
    private regionService: RegionService,
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

      this.amount = params['amount'] || 1000;
      this.miners = params['miners'] || 2;
      this.cycletime = params['cycletime'] || 90;
      this.range = params['range'] || 17;
    });

    this.entries = this.search
      .switchMap(lines => Observable.from(lines)
        .map(line => this.transformLine(line))
        .flatMap(entry => this.loadIDIntoEntry(entry))
        .reduce((cur, add) => cur.concat(add), [])
      )
      .share();

    this.totalVolume = this.entries
      .map(entries => entries.map(o => o.volume))
      .map(volumes => volumes.reduce((a, b) => a + b, 0))
      .share();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateUrl(): void {
    const params: any = {};
    if (!this.isSell) { params.pricetype = 'buy'; }
    if (Number(this.pricearea) !== 60003760) { params.pricearea = Number(this.pricearea); }
    if (Number(this.amount) !== 1000) { params.amount = Number(this.amount); }
    if (Number(this.miners) !== 2) { params.miners = Number(this.miners); }
    if (Number(this.cycletime) !== 90) { params.cycletime = Number(this.cycletime); }
    if (Number(this.range) !== 17) { params.range = Number(this.range); }
    this.router.navigate([params]);
  }

  private transformLine(line: string): SurveyScannerEntry {
    const match = SURVEY_SCANNER_REGEX.exec(line);

    if (!match) { return null; }
    const entry = new SurveyScannerEntry;

    entry.name = match[1].trim();
    entry.amount = Number(match[2].replace(/,/g, ''));
    entry.volume = Number(match[3].replace(/,/g, ''));
    entry.distance = Number(match[4].replace(/,/g, '').replace(/ /g, '').replace('k', '000'));

    return entry;
  }

  private loadIDIntoEntry(entry: SurveyScannerEntry): Observable<SurveyScannerEntry> {
    if (!this.idFromNameCache[entry.name]) {
      this.idFromNameCache[entry.name] = new ReplaySubject(1);
      this.searchService.inventorytype(entry.name, true)
        .map(array => array[0] || 0)
        .map(id => {
          entry.typeID = id;
          return entry;
        })
        .subscribe(data => this.idFromNameCache[entry.name].next(data), err =>
          this.idFromNameCache[entry.name].error(err), () => this.idFromNameCache[entry.name].complete()
        );
    }
    return this.idFromNameCache[entry.name];
  }

  getStations() {
    return this.fuzzworkMarketService.stations;
  }

  getRegions() {
    return this.regionService.get();
  }
}
