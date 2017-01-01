import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { AutocompleteHit } from './autocomplete-hit';

@Injectable()
export class AutocompleteService {
  private characterCache = {};

  constructor(
    private http: Http
  ) { }

  private makeCall(name: string): Observable<AutocompleteHit[]> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(`https://zkillboard.com/autocomplete/`, 'query=' + encodeURIComponent(name), options)
      .map((r: Response) => r.json());
  }

  character(name: string): Observable<AutocompleteHit[]> {
    // https://zkillboard.com/autocomplete/characterID/rell%20silfani/
    if (!this.characterCache[name]) {
      this.characterCache[name] = new ReplaySubject(1);
      this.makeCall(name)
        .map(data => data.filter(entry => entry.type === 'character'))
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
