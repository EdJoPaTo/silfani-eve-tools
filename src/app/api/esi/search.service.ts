import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class SearchService {
  private characterCache = {};

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
    return this.makeCall(name, [ 'character' ], strict)
      .map(o => o && o.character);
  }
}
