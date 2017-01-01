import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs/Rx';

import { FuzzworkMarketService, TypeIdFromNameService } from '../api/fuzzwork';
import { ItemTypesService, RegionService } from '../api/eve-crest';

import { Item } from './item';

@Component({
  selector: 'app-clipboard-estimator',
  templateUrl: './clipboard-estimator.component.html',
  styleUrls: ['./clipboard-estimator.component.scss']
})
export class ClipboardEstimatorComponent implements OnInit, OnDestroy {
  initialContent: string = `3.000  Veldspar
2  Logic Circuit
XR-3200 Heavy Missile Bay
Rell Silfani
Fried Interface Circuit  30  Salvaged Materials  0,30 m3
Power Circuit  2  Salvaged Materials  0,02 m3
Karnis Delvari
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
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateUrl(): void {
    let params: any = {};
    if (!this.isSell) { params.pricetype = 'buy'; }
    if (Number(this.pricearea) !== 60003760) { params.pricearea = Number(this.pricearea); }
    this.router.navigate([params]);
  }
}
