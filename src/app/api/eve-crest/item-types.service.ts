import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PathsService } from './paths.service';

@Injectable()
export class ItemTypesService {

  constructor(
    private http: Http,
    private paths: PathsService
  ) { }

  get(itemID: number): Observable<any> {
    return this.paths.service('itemTypes')
    .map(info => info.href)
    .flatMap(url => this.http.get(`${url}${itemID}/`))
    .map((r: Response) => r.json());
  }
}
