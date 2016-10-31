import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { PathsService } from './paths.service';
import { ItemService } from './item.service';

export class Region {
  public name: string;
  public id: number;
  public id_str: string;
  public href: string;
}

@Injectable()
export class RegionService {
  private cache: ReplaySubject<Region[]>;

  constructor(
    private http: Http,
    private paths: PathsService,
    private itemService: ItemService
  ) { }

  private reduceRegions(current, add) {
    return current.concat(add);
  }

  get(): Observable<Region[]> {
    if (!this.cache) {
      this.cache = new ReplaySubject<Region[]>(1);
      this.paths.service('regions')
        .map(info => info.href)
        .flatMap(url => this.itemService.get(url))
        .flatMap(regions => regions)
        .filter((region: Region) => region.name.indexOf('-R00') === -1)
        .reduce((cur: Region[], add: Region) => cur.concat(add), [])
        .subscribe((data: Region[]) => this.cache.next(data),
        err => this.cache.error(err),
        () => this.cache.complete()
        );
    }
    return this.cache;
  }
}
