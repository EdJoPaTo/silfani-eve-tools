import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class SearchService {

  constructor(
    private http: Http
  ) { }

  private makeCall(search: string, categories: string[], strict = false): Observable<any> {
    if (search.length < 3) {
      return Observable.of({});
    }

    let url = 'https://esi.evetech.net/v2/search/?search=';
    url += encodeURIComponent(search);

    url += '&categories=';
    url += categories.join('%2C'); // ,

    if (strict) {
      url += '&strict=true';
    }

    return this.http
      .get(url)
      .map((r: Response) => r.json());
  }

  character(name: string, strict = false): Observable<number[]> {
    return this.makeCall(name, ['character'], strict)
      .map(o => (o && o.character) || []);
  }

  inventorytype(name: string, strict = false): Observable<number[]> {
    return this.makeCall(name, ['inventory_type'], strict)
      .map(o => (o && o.inventory_type) || []);
  }
}
