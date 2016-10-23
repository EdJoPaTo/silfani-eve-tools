import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const URL = 'https://www.fuzzwork.co.uk/api/typeid.php?typename=';

@Injectable()
export class TypeIdFromNameService {

  constructor(
    private http: Http
  ) { }

  get(name: string): Observable<any> {
    // https://www.fuzzwork.co.uk/api/typeid.php?typename=Tritanium

    let url = `https://www.fuzzwork.co.uk/api/typeid.php?typename=${name}`;

    return this.http
      .get(url)
      .map((r: Response) => r.json());
  }

  getId(name: string): Observable<number> {
    return this.get(name)
      .map(i => i.typeID);
  }
}
