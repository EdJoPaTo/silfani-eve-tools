import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const URL = 'https://www.fuzzwork.co.uk/api/typeid.php?typename=';

@Injectable()
export class TypeIdFromNameService {
  private ids = {};

  constructor(
    private http: Http
  ) { }

  getId(name: string): Observable<number> {
    // https://www.fuzzwork.co.uk/api/typeid.php?typename=Tritanium

    let url = `${URL}${name}`;

    if (this.ids[name]) {
      return Observable.of<number>(this.ids[name]);
    }

    return this.http
      .get(url)
      .map((r: Response) => r.json())
      .map(i => i.typeID)
      .map(id => {
        if (!this.ids[name]) {
          this.ids[name] = id;
        }
        console.log('ids', this.ids);

        return id;
      });
  }
}
