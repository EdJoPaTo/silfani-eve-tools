import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { ZKillStats } from './z-kill-stats';


@Injectable()
export class ZKillStatsService {
  private charCache = {};
  private corpCache = {};
  private alliCache = {};

  charStatsDict: any = {};
  corpStatsDict: any = {};
  alliStatsDict: any = {};

  constructor(
    private http: Http
  ) { }

  character(id: number): Observable<ZKillStats> {
    // https://zkillboard.com/api/stats/characterID/91572014/
    if (!this.charCache[id]) {
      this.charCache[id] = new ReplaySubject(1);
      this.http
        .get(`https://zkillboard.com/api/stats/characterID/${id}/`)
        .map((r: Response) => r.json())
        .map(json => json && json.info ? new ZKillStats(json) : null)
        .subscribe(data => this.charCache[id].next(data),
        err => this.charCache[id].error(err),
        () => this.charCache[id].complete()
        );
    }
    return this.charCache[id];
  }

  corporation(id: number): Observable<ZKillStats> {
    // https://zkillboard.com/api/stats/corporationID/1000080/
    if (!this.corpCache[id]) {
      this.corpCache[id] = new ReplaySubject(1);
      this.http
        .get(`https://zkillboard.com/api/stats/corporationID/${id}/`)
        .map((r: Response) => r.json())
        .map(json => json && json.info ? new ZKillStats(json) : null)
        .subscribe(data => this.corpCache[id].next(data),
        err => this.corpCache[id].error(err),
        () => this.corpCache[id].complete()
        );
    }
    return this.corpCache[id];
  }

  alliance(id: number): Observable<ZKillStats> {
    // https://zkillboard.com/api/stats/allianceID/1783407081/
    if (!this.alliCache[id]) {
      this.alliCache[id] = new ReplaySubject(1);
      this.http
        .get(`https://zkillboard.com/api/stats/allianceID/${id}/`)
        .map((r: Response) => r.json())
        .map(json => json && json.info ? new ZKillStats(json) : null)
        .subscribe(data => this.alliCache[id].next(data),
        err => this.alliCache[id].error(err),
        () => this.alliCache[id].complete()
        );
    }
    return this.alliCache[id];
  }


  // TODO: remove this
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
