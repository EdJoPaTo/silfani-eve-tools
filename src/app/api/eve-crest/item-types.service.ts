import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { PathsService } from './paths.service';

@Injectable()
export class ItemTypesService {
  private cache = {};

  constructor(
    private http: Http,
    private paths: PathsService
  ) { }

  get(itemID: number): Observable<any> {
    if (!this.cache[itemID]) {
      this.cache[itemID] = new ReplaySubject(1);
      this.paths.service('itemTypes')
        .map(info => info.href)
        .flatMap(url => this.http.get(`${url}${itemID}/`))
        .map((r: Response) => r.json())
        .subscribe(data => this.cache[itemID].next(data),
        err => this.cache[itemID].error(err),
        () => this.cache[itemID].complete()
        );
    }
    return this.cache[itemID];
  }
}
