import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ZKillStats } from './z-kill-stats';


@Injectable()
export class ZKillStatsService {

  constructor(
    private http: Http
  ) { }

  character(id: number): Observable<ZKillStats> {
    // https://zkillboard.com/api/stats/characterID/91572014/
    return this.http
      .get(`https://zkillboard.com/api/stats/characterID/${id}/`)
      .map((r: Response) => r.json())
      .map(json => json && json.info ? new ZKillStats(json) : null);
  }

  corporation(id: number): Observable<ZKillStats> {
    // https://zkillboard.com/api/stats/corporationID/1000080/
    return this.http
      .get(`https://zkillboard.com/api/stats/corporationID/${id}/`)
      .map((r: Response) => r.json())
      .map(json => json && json.info ? new ZKillStats(json) : null);
  }
}
