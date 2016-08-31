import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BASEURL } from './baseurl';

@Injectable()
export class MissionService {
  constructor(
    private http: Http
  ) { }

  get() {
    return this.http
      .get(BASEURL + `missions.json`)
      .map((r: Response) => r.json());
  }
}
