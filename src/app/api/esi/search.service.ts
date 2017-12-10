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
    let url = 'https://esi.tech.ccp.is/v1/search/?search=';
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
      .map(o => o && o.character);
  }

  inventorytype(name: string, strict = false): Observable<number[]> {
    return this.makeCall(name, ['inventorytype'], strict)
      .map(o => o && o.inventorytype);
  }
}
