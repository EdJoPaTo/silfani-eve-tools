import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

import { FuzzworkMarketService } from '../api/fuzzwork';
import { RegionService } from '../api/eve-crest';

import { SurveyScannerEntry } from './survey-scanner-entry';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  initialContent: string = `Concentrated Veldspar  113.729  14 km
Concentrated Veldspar  90.271  15 km
Concentrated Veldspar  121.180  22 km
Dense Veldspar  54.754  7.790 m
Dense Veldspar  106.490  28 km
Pyroxeres  11.548  15 km
Pyroxeres  5.426  16 km
Pyroxeres  7.977  17 km
Pyroxeres  12.449  19 km
Pyroxeres  12.314  21 km
Pyroxeres  11.016  23 km
Pyroxeres  8.226  26 km
Solid Pyroxeres  11.950  14 km
Solid Pyroxeres  9.977  18 km`;
  search = new Subject<string[]>();
  entries: Observable<SurveyScannerEntry[]>;
  pricearea: number;
  isSell = true;
  private sub: Subscription;

  amount: number;
  miners: number;
  cycletime: number;
  range: number;

  constructor(
    private fuzzworkMarketService: FuzzworkMarketService,
    private regionService: RegionService,
    private route: ActivatedRoute,
    private router: Router
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

  soloTimeRemaining(totalVolume, cycletime, amount, miners): number {
    const a = totalVolume / amount;
    const b = cycletime / miners;
    return a * b; // seconds
  }
}
