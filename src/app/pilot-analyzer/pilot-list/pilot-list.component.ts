import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ZKillStats } from '../../api/z-killboard';
import { Hovered } from '../hovered';

@Component({
  selector: 'app-pilot-list',
  templateUrl: './pilot-list.component.html',
  styleUrls: ['./pilot-list.component.scss']
})
export class PilotListComponent implements OnInit {
  @Input() characters: ZKillStats[];
  @Input() unknown: string[];
  @Input() hovered: Hovered;

  constructor(
  ) { }

  ngOnInit() {
  }

  mouseenter(character: ZKillStats) {
    this.hovered.corporationID = character.info.corporationID;
    this.hovered.allianceID = character.info.allianceID || null;
  }

  mouseleave(character: ZKillStats) {
    this.hovered.corporationID = null;
    this.hovered.allianceID = null;
  }

  sorted(characters: ZKillStats[]): ZKillStats[] {
    if (!characters) { return []; }
    characters.sort((a, b) => b.iskDestroyed - a.iskDestroyed);
    return characters;
  }
}
