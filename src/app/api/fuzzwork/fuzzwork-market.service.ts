import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class FuzzworkMarketService {
  private cache = {};
  stations = [
    { name: 'Jita IV M4 CNAP', id: 60003760 }, // Jita IV - Moon 4 - Caldari Navy Assembly Plant
    { name: 'Amarr VIII', id: 60008494 }, // Amarr VIII (Oris) - Emperor Family Academy
    { name: 'Dodixie IX M20', id: 60011866 }, // Dodixie IX - Moon 20 - Federation Navy Assembly Plant
    { name: 'Rens VI M8', id: 60004588 }, // Rens VI - Moon 8 - Brutor Tribe Treasure
    { name: 'Hek VIII M12', id: 60005686 } // Hek VIII - Moon 12 - Boundless Creation Factory
  ];

  constructor(
    private http: Http
  ) { }

  private kind(area) { return area >= 60000000 ? 'station' : 'region'; }

  get(ids: number[], area = 60003760): Observable<any> {
    // https://market.fuzzwork.co.uk/aggregates/?region=10000002&types=34,35,36,37,38,39,40
    // https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=34,35,36,37,38,39,40

    const kind = this.kind(area);
    const types = ids.toString();

    const url = `https://market.fuzzwork.co.uk/aggregates/?${kind}=${area}&types=${types}`;

    return this.http
      .get(url)
      .map((r: Response) => r.json());
  }

  getSingle(id: number, area = 60003760, forceRefresh?: boolean): Observable<any> {
    if (!this.cache[area]) { this.cache[area] = {}; }
    if (!this.cache[area][id] || forceRefresh) {
      if (!this.cache[area][id]) {
        this.cache[area][id] = new ReplaySubject(1);
      }
      this.get([id], area)
        .map(pricedata => pricedata[id])
        .subscribe(data => this.cache[area][id].next(data),
        err => this.cache[area][id].error(err),
        () => this.cache[area][id].complete()
        );
    }
    return this.cache[area][id];
  }

  detailsUrl(id: number, area = 60003760, isSell = true) {
    // Tritanium in Jita IV - 4
    // https://market.fuzzwork.co.uk/station/60003760/type/34/#buy

    const kind = this.kind(area);

    return `https://market.fuzzwork.co.uk/${kind}/${area}/type/${id}/${isSell ? '' : '#buy'}`;
  }
}
