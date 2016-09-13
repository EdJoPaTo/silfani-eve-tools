import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const CREST_URL = 'https://crest-tq.eveonline.com/';

@Injectable()
export class PathsService {

  constructor(
    private http: Http
  ) { }

  getAll(): Observable<any> {
    return this.http
      .get(CREST_URL)
      .map((r: Response) => r.json());
  }

  pilotsOnline(): Observable<number> {
    return this.getAll()
      .map(info => info.userCount);
  }

  serverName(): Observable<string> {
    return this.getAll()
      .map(info => info.serverName);
  }

  serviceStatus(): Observable<string> {
    return this.getAll()
      .map(info => info.serviceStatus);
  }

  serverVersion(): Observable<string> {
    return this.getAll()
      .map(info => info.serverVersion);
  }

  service(name: string): Observable<any> {
    return this.getAll()
      .map(info => info[name]);
  }
}
