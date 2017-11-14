import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

const URL = 'https://www.fuzzwork.co.uk/api/typeid.php?typename=';

@Injectable()
export class TypeIdFromNameService {
  private cache = {};

  constructor(
    private http: Http
  ) { }

  getId(name: string): Observable<number> {
    // https://www.fuzzwork.co.uk/api/typeid.php?typename=Tritanium
    if (!this.cache[name]) {
      this.cache[name] = new ReplaySubject(1);
      this.http
        .get(`${URL}${name}`)
        .map((r: Response) => r.json())
        .map(i => i.typeID)
        .subscribe(data => this.cache[name].next(data),
        err => this.cache[name].error(err),
        () => this.cache[name].complete()
        );
    }
    return this.cache[name];
  }
}
