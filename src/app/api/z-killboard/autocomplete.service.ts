import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AutocompleteService {

  constructor(
    private http: Http
  ) { }

  character(name: string): Observable<any[]> {
    // https://zkillboard.com/autocomplete/characterID/rell%20silfani/
    return this.http
      .get(`https://zkillboard.com/autocomplete/characterID/${name}/`)
      .map((r: Response) => r.json());
  }

  characterID(name: string): Observable<number[]> {
    return this.character(name)
      .map(json => json.map(char => char.id));
  }
}
