import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  constructor(
    private http: Http
  ) { }

  get(url: string): Observable<any[]> {
    return this.http.get(url)
      .map((r: Response) => r.json())
      .map(content => content.pageCount)
      .flatMap(pageCount => Observable.range(1, pageCount))
      .map(pageID => pageID === 1 ? url : url + '?page=' + pageID)
      .flatMap(pageUrl => this.http.get(pageUrl))
      .map((r: Response) => r.json())
      .map(content => content.items);
  }
}
