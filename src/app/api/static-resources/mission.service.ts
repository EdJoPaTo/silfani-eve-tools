import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { BASEURL } from './baseurl';

@Injectable()
export class MissionService {
  private cache: ReplaySubject<any>;

  constructor(
    private http: Http
  ) { }

  get(): Observable<any> {
    if (!this.cache) {
      this.cache = new ReplaySubject(1);
      this.http
        .get(BASEURL + `missions.json`)
        .map((r: Response) => r.json())
        .subscribe(data => this.cache.next(data), err => this.cache.error(err));
    }
    return this.cache;
  }
}
