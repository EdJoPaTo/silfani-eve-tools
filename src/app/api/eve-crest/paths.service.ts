import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

const CREST_URL = 'https://crest-tq.eveonline.com/';

@Injectable()
export class PathsService {
  private cache = new ReplaySubject(1);

  constructor(
    private http: Http
  ) { }

  getAll(forceRefresh = false): Observable<any> {
    if (!this.cache.observers.length || forceRefresh) {
      this.http
        .get(CREST_URL)
        .map((r: Response) => r.json())
        .subscribe(data => this.cache.next(data),
        error => this.cache.error(error),
        () => this.cache.complete()
        );
    }
    return this.cache;
  }

  pilotsOnline(): Observable<number> {
    return this.getAll(true)
      .map(info => info.userCount);
  }

  serverName(): Observable<string> {
    return this.getAll()
      .map(info => info.serverName);
  }

  serviceStatus(): Observable<string> {
    return this.getAll(true)
      .map(info => info.serviceStatus);
  }

  serverVersion(): Observable<string> {
    return this.getAll(true)
      .map(info => info.serverVersion);
  }

  service(name: string): Observable<any> {
    return this.getAll()
      .map(info => info[name]);
  }
}
