import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-player-group-list',
  templateUrl: 'player-group-list.component.html',
  styleUrls: ['player-group-list.component.css']
})
export class PlayerGroupListComponent implements OnInit {
  @Input() characters: CharacterStats[];

  constructor() { }

  ngOnInit() {
  }

  getCounts(characters: CharacterStats[]) {
    let counts = {};

    characters
      .map(char => char.info)
      .forEach(info => {
        if (info.allianceID !== 0) {
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
