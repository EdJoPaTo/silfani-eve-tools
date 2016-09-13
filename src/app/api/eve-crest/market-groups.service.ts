import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PathsService } from './paths.service';
import { ItemService } from './item.service';

@Injectable()
export class MarketGroupsService {

  constructor(
    private http: Http,
    private paths: PathsService,
    private itemService: ItemService
  ) { }

  info(groupID: number): Observable<any> {
    return this.paths.service('marketGroups')
      .map(info => info.href)
      .flatMap(url => this.http.get(`${url}${groupID}/`))
      .map((r: Response) => r.json());
  }

  private types(groupID: number): Observable<any[]> {
    return this.info(groupID)
      .map(info => info.types.href)
      .flatMap(url => this.itemService.get(url));
  }

  subgroups(groupID: number): Observable<number[]> {
    return this.types(groupID)
      .map(types => types
        .map(i => i.marketGroup.id)
        .filter(i => i !== groupID) // not my own id
      )
      .map(ids => Array.from(new Set(ids))); // distinct
  }

  directSubTypes(groupID: number): Observable<any[]> {
    return this.types(groupID)
      .map(types => types
        .filter(i => i.marketGroup.id === groupID)
      )
      .map(items => items.map(item => item.type));
  }

}
