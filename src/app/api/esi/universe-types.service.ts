import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UniverseTypesService {
  private cache = {};

  constructor(
    private http: Http
  ) { }

  get(itemID: number): Observable<any> {
    if (!this.cache[itemID]) {
      this.cache[itemID] = new ReplaySubject(1);
      const url = `https://esi.tech.ccp.is/v3/universe/types/${itemID}/`;

      this.http
        .get(url)
        .map((r: Response) => r.json())
        .subscribe(data => this.cache[itemID].next(data),
        err => this.cache[itemID].error(err),
        () => this.cache[itemID].complete()
        );
    }
    return this.cache[itemID];
  }
}
