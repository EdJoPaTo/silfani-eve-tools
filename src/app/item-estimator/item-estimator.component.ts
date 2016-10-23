import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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

  constructor(
    private parseItemLineService: ParseItemLineService
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
          .map(this.parseItemLineService.parse)
          .map(this.itemFromLineInfo)
          .subscribe(item => {
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

  itemFromLineInfo(lineinfo: LineInfo): Item {
    // TODO: replace with a service
    let i = new Item();
    i.id = 1230;
    i.amount = lineinfo.amount;
    return i;
  }

  splitLines(input: string): string[] { return input.split('\n').filter(str => str); }
  search(term: string) { this.searchTerms.next(term); }
}
