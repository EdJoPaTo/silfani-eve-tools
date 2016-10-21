import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BASEURL } from '../baseurl';

@Injectable()
export class ReprocessService {

  constructor(
    private http: Http
  ) { }

  get(itemId: number) {
    return this.http
      .get(BASEURL + `evedump/reprocess.json`)
      .map((r: Response) => r.json())
      .map(data => data[itemId])
      .map(item => {
        if (!item) { return []; }

        let arr: any[] = [];
        let itemIds = Object.keys(item);

        for (let i = 0; i < itemIds.length; i++) {
          arr[i] = { id: itemIds[i], amount: item[itemIds[i]] };
        }
        return arr;
      });
  }
}
