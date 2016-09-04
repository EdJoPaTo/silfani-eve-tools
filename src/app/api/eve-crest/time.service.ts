import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PathsService } from './paths.service';

@Injectable()
export class TimeService {

  constructor(
    private http: Http,
    private paths: PathsService
  ) { }

  get(): Observable<Date> {
    return this.paths.service('time')
      .map(info => info.href)
      .flatMap(url => this.http.get(url))
      .map((r: Response) => r.json())
      .map(info => info.time)
      .map(timestring => new Date(Date.parse(timestring)));
  }

}
