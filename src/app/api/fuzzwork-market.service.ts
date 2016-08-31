import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FuzzworkMarketService {

  constructor(
    private http: Http
  ) { }

  get(ids: number[], area = 60003760): Observable<any> {
    // https://market.fuzzwork.co.uk/aggregates/?region=10000002&types=34,35,36,37,38,39,40
    // https://market.fuzzwork.co.uk/aggregates/?station=60003760&types=34,35,36,37,38,39,40

    let kind = area >= 60000000 ? 'station' : 'region';
    let types = ids.toString();

    let url = `https://market.fuzzwork.co.uk/aggregates/?${kind}=${area}&types=${types}`;

    return this.http
      .get(url)
      .map((r: Response) => r.json());
  }
}
