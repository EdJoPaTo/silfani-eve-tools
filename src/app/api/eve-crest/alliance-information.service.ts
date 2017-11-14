import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { PathsService } from './paths.service';

@Injectable()
export class AllianceInformationService {
  private cache = {};

  constructor(
    private http: Http,
    private paths: PathsService
  ) { }

  get(allianceID: number): Observable<any> {
    if (!this.cache[allianceID]) {
      this.cache[allianceID] = new ReplaySubject(1);
      this.paths.service('alliances')
        .map(info => info.href)
        .flatMap(url => this.http.get(`${url}${allianceID}/`))
        .map((r: Response) => r.json())
        .subscribe(data => this.cache[allianceID].next(data),
        err => this.cache[allianceID].error(err),
        () => this.cache[allianceID].complete()
        );
    }
    return this.cache[allianceID];
  }

  getName(allianceID: number): Observable<string> {
    return this.get(allianceID).map(r => r.name);
  }

  getTag(allianceID: number): Observable<string> {
    return this.get(allianceID).map(r => r.shortName);
  }
}
