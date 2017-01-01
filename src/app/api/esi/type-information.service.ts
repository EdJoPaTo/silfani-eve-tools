import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class TypeInformationService {
  private cache = {};

  constructor(
    private http: Http
  ) { }

  get(id: number): Observable<any> {
    if (!this.cache[id]) {
      this.cache[id] = new ReplaySubject(1);
      this.http
        .get(`https://esi.tech.ccp.is/v1/universe/types/${id}/`)
        .map((r: Response) => r.json())
        .subscribe(data => this.cache[id].next(data),
        err => this.cache[id].error(err),
        () => this.cache[id].complete()
        );
    }
    return this.cache[id];
  }

  name(id: number): Observable<string> {
    return this.get(id)
      .map(info => info.type_name);
  }

}
