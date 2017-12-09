import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BASEURL } from './baseurl';

@Injectable()
export class MissionService {

  constructor(
    private http: Http
  ) { }

  get(): Observable<any> {
    return this.http
      .get(`${BASEURL}/missions.json`)
      .map((r: Response) => r.json());
  }
}
