import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PathsService } from './paths.service';

@Injectable()
export class AllianceInformationService {
  private allianceDict = {};

  constructor(
    private http: Http,
    private paths: PathsService
  ) { }

  get(allianceID: number): Observable<any> {
    return this.paths.service('alliances')
      .map(info => info.href)
      .flatMap(url => this.http.get(`${url}${allianceID}/`))
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
