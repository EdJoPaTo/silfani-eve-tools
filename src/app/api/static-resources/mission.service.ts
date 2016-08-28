import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MissionService {
  constructor(
    private http: Http
  ) { }

  get() {
    // http://eve-static.xmas2014.3t0.de/eve-survival/missions.json
    return this.http
      .get(`http://eve-static.xmas2014.3t0.de/eve-survival/missions.json`)
      .map((r: Response) => r.json());
  }
}
