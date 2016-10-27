import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class AutocompleteService {
  private characterIdCache = {};

  constructor(
    private http: Http
  ) { }

  characterID(name: string): Observable<number[]> {
    // https://zkillboard.com/autocomplete/characterID/rell%20silfani/
    if (!this.characterIdCache[name]) {
      this.characterIdCache[name] = new ReplaySubject(1);
      this.http
        .get(`https://zkillboard.com/autocomplete/characterID/${name}/`)
        .map((r: Response) => r.json())
        .map(json => json.map(char => char.id))
        .subscribe(data => this.characterIdCache[name].next(data),
        err => this.characterIdCache[name].error(err),
        () => this.characterIdCache[name].complete()
        );
    }
    return this.characterIdCache[name];
  }
}
