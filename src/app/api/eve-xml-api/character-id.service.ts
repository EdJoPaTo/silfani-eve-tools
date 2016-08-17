import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CharacterIdService {

  constructor(
    private http: Http
  ) { }

  get(characterName: string): Observable<number> {
    // https://api.eveonline.com/eve/CharacterID.xml.aspx?names=Rell%20Silfani
    return this.http
      .get(`https://api.eveonline.com/eve/CharacterID.xml.aspx?names=${characterName}`)
      .map((r: Response) => {
        let xml = r.text();
        let idString: string = /characterID="(\d+)/.exec(xml)[1];
        let id: number = Number(idString);
        return id;
      });
  }

}
