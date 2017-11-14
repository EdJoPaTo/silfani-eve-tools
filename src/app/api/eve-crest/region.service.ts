import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

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
