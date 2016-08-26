import { Pipe, PipeTransform } from '@angular/core';

import { CharacterStats } from '../../api/z-killboard/character-stats';

function orderByDesc(obj, selector) {
  let tmp = JSON.parse(JSON.stringify(obj));
  tmp.sort(function(a, b) {
    if (selector(a) > selector(b)) { return -1; }
    if (selector(a) < selector(b)) { return 1; }
    // a must be equal to b
    return 0;
  });
  return tmp;
}

@Pipe({
  name: 'groupcount'
})
export class GroupcountPipe implements PipeTransform {

  transform(characters: CharacterStats[], args?: any): any[] {
    if (!characters) { return []; }
    let counts = {};

    characters
      .map(char => char.info)
      .forEach(info => {
        if (info.allianceID) {
          if (!counts['a' + info.allianceID]) {
            counts['a' + info.allianceID] = { allianceID: info.allianceID, count: 0 };
          }
          counts['a' + info.allianceID].count += 1;
        } else {
          if (!counts['c' + info.corporationID]) {
            counts['c' + info.corporationID] = { corporationID: info.corporationID, count: 0 };
          }
          counts['c' + info.corporationID].count += 1;
        }
      });

    let countsArr = Object.keys(counts).map(key => counts[key]);
    return orderByDesc(countsArr, i => i.count);
  }
}
