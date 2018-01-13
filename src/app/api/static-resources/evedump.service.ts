import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { BASEURL } from './baseurl';

const EVEDUMP_BASEURL = `${BASEURL}/evedump`;

@Injectable()
export class EvedumpService {
  private regionCache: ReplaySubject<any>;

  constructor(
    private http: Http
  ) { }

  regions(): Observable<any> {
    if (!this.regionCache) {
      this.regionCache = new ReplaySubject<any>(1);
      this.http
        .get(`${EVEDUMP_BASEURL}/regions.json`)
        .map((r: Response) => r.json())
        .subscribe((data: any[]) => this.regionCache.next(data),
        err => this.regionCache.error(err),
        () => this.regionCache.complete()
        );
    }
    return this.regionCache;
  }

  regionArr(): Observable<any[]> {
    return this.regions()
      .map(o => {
        const ids = Object.keys(o);
        const result = ids.map(i => ({ id: i, name: o[i].name, factionID: o[i].factionID, factionName: o[i].factionName }));
        result.sort((a, b) => a.name.localeCompare(b.name));
        return result;
      });
  }
}
