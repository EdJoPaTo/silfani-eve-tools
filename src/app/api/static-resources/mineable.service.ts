import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BASEURL } from './baseurl';

@Injectable()
export class MineableService {

  constructor(
    private http: Http
  ) { }

  get() {
    return this.http
      .get(BASEURL + `mineable.json`)
      .map((r: Response) => r.json());
  }
}
