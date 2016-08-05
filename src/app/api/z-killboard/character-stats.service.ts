import { Injectable } from '@angular/core';

import { CharacterStats } from './character-stats';
import { DummyCharacterStats } from './dummy-character-stats';

@Injectable()
export class CharacterStatsService {

  constructor() { }

  get(characterID: number) {
    // https://zkillboard.com/api/stats/characterID/91572014/
    let json = DummyCharacterStats.find(char => char.id === characterID);
    let obj = new CharacterStats(json);

    return Promise.resolve(obj);
  }

}
