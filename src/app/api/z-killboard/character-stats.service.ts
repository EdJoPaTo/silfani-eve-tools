import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CharacterStats } from './character-stats';

@Injectable()
export class CharacterStatsService {

  constructor(
    private http: Http
  ) { }

  get(characterID: number): Observable<CharacterStats> {
    // https://zkillboard.com/api/stats/characterID/91572014/
    return this.http
      .get(`https://zkillboard.com/api/stats/characterID/${characterID}/`)
      .map((r: Response) => r.json())
      .filter(json => json && json.info)
      .map(json => new CharacterStats(json));
  }

}
