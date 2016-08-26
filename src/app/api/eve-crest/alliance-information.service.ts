import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AllianceInformationService {
  private allianceDict = {};

  constructor(
    private http: Http
  ) { }

  get(allianceID: number): Observable<any> {
    // https://crest-tq.eveonline.com/alliances/1783407081/
    return this.http
      .get(`https://crest-tq.eveonline.com/alliances/${allianceID}/`)
      .map((r: Response) => r.json());
  }

  private getCached(allianceID: number): any {
    if (this.allianceDict[allianceID] !== null && !this.allianceDict[allianceID]) {
      this.allianceDict[allianceID] = null;
      this.get(allianceID)
        .subscribe(json => this.allianceDict[allianceID] = json);
    }
    return this.allianceDict[allianceID];
  }

  getName(allianceID: number): string {
    let result = this.getCached(allianceID);
    return result ? result.name : 'loading...';
  }

  getTag(allianceID: number): string {
    let result = this.getCached(allianceID);
    return result ? result.shortName : 'loading...';
  }
}