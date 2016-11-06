import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { AutocompleteHit } from './autocomplete-hit';

@Injectable()
export class AutocompleteService {
  private characterCache = {};

  constructor(
    private http: Http
  ) { }

  private makeCall(type: string, name: string): Observable<AutocompleteHit[]> {
    return this.http
      .get(`https://zkillboard.com/autocomplete/${type}${type ? '/' : ''}${name}/`)
      .map((r: Response) => r.json());
  }

  character(name: string): Observable<AutocompleteHit[]> {
    // https://zkillboard.com/autocomplete/characterID/rell%20silfani/
    if (!this.characterCache[name]) {
      this.characterCache[name] = new ReplaySubject(1);
      this.makeCall('characterID', name)
        .subscribe(data => this.characterCache[name].next(data),
        err => this.characterCache[name].error(err),
        () => this.characterCache[name].complete()
        );
    }
    return this.characterCache[name];
  }

  characterID(name: string): Observable<number[]> {
    return this.character(name)
      .map(chars => chars.map(char => char.id));
  }
}
