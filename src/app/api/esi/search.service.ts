import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchService {

  constructor(
    private http: Http
  ) { }

  search(term: string, categories: string[], strict = false, language = 'en-us'): Observable<any> {
    if (!term || term.length < 3) {
      return Observable.of<any>({});
    }

    categories.sort();
    let categoriesString = categories.join(',');

    return this.http
      .get(`https://esi.tech.ccp.is/v1/search/?search=${term}&categories=${categoriesString}&language=${language}&strict=${strict}`)
      .map((r: Response) => r.json());
  }

  private specific(term: string, categorie: string, strict = false, language = 'en-us'): Observable<number[]> {
    return this.search(term, [categorie], strict, language)
      .map(result => result[categorie] ? result[categorie] : []);
  }

  character(name: string, strict = false): Observable<number[]> {
    return this.specific(name, 'character', strict);
  }

  inventorytype(name: string, strict = false, language = 'en-us'): Observable<number[]> {
    return this.specific(name, 'inventorytype', strict);
  }

  alliance(name: string, strict = false): Observable<number[]> {
    return this.specific(name, 'alliance', strict);
  }

  corporation(name: string, strict = false): Observable<number[]> {
    return this.specific(name, 'corporation', strict);
  }

  solarsystem(name: string, strict = false): Observable<number[]> {
    return this.specific(name, 'solarsystem', strict);
  }
}
