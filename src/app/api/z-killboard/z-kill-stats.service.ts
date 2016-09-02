import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ZKillStats } from './z-kill-stats';


@Injectable()
export class ZKillStatsService {
  charStatsDict: any = {};
  corpStatsDict: any = {};
  alliStatsDict: any = {};

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

  alliance(id: number): Observable<ZKillStats> {
    // https://zkillboard.com/api/stats/allianceID/1783407081/
    return this.http
      .get(`https://zkillboard.com/api/stats/allianceID/${id}/`)
      .map((r: Response) => r.json())
      .map(json => json && json.info ? new ZKillStats(json) : null);
  }

  characterCached(id: number): ZKillStats {
    if (this.charStatsDict[id] !== null && !this.charStatsDict[id]) {
      this.charStatsDict[id] = null;
      this.character(id).subscribe(stats => this.charStatsDict[id] = stats);
    }
    return this.charStatsDict[id];
  }

  corporationCached(id: number): ZKillStats {
    if (this.corpStatsDict[id] !== null && !this.corpStatsDict[id]) {
      this.corpStatsDict[id] = null;
      this.corporation(id).subscribe(stats => this.corpStatsDict[id] = stats);
    }
    return this.corpStatsDict[id];
  }

  allianceCached(id: number): ZKillStats {
    if (this.alliStatsDict[id] !== null && !this.alliStatsDict[id]) {
      this.alliStatsDict[id] = null;
      this.alliance(id).subscribe(stats => this.alliStatsDict[id] = stats);
    }
    return this.alliStatsDict[id];
  }
}
