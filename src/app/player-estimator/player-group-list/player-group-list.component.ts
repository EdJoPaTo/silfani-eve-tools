import { Component, Input, OnInit } from '@angular/core';

import { CharacterStats } from '../../api/z-killboard/character-stats';
import { AllianceInformationService } from '../../api/eve-crest/alliance-information.service';
import { Hovered } from '../hovered';

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
  styleUrls: ['player-group-list.component.scss']
})
export class PlayerGroupListComponent implements OnInit {
  @Input() characters: CharacterStats[];
  @Input() hovered: Hovered;

  constructor(
    private allianceInformationService: AllianceInformationService
  ) { }

  ngOnInit() {
  }

  mouseenter(obj: any) {
    this.hovered.corporationID = obj.corporationID || null;
    this.hovered.allianceID = obj.allianceID || null;
    // console.log('enter', obj, this.hovered);
  }

  mouseleave(obj: any) {
    this.hovered.corporationID = null;
    this.hovered.allianceID = null;
    // console.log('leave', obj);
  }

  getCounts(characters: CharacterStats[]) {
    // TODO: als Pipe umsetzen -> change detection wird damit vllt umgangen

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

  allianceName(allianceID: number): string {
    return this.allianceInformationService.getName(allianceID);
  }
}
