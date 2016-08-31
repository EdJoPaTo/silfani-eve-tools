import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BASEURL } from './baseurl';

@Injectable()
export class MissionService {
  constructor(
    private http: Http
  ) { }

  get() {
    // http://eve-static.xmas2014.3t0.de/eve-survival/missions.json
    return this.http
      .get(BASEURL + `eve-survival/missions.json`)
      .map((r: Response) => r.json());
  }
}
