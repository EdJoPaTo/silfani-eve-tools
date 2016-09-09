import { Component, Input, OnInit } from '@angular/core';

import { ZKillStats } from '../../api/z-killboard/z-kill-stats';
import { AllianceInformationService } from '../../api/eve-crest/alliance-information.service';
import { Hovered } from '../hovered';

@Component({
  selector: 'app-pilot-list',
  templateUrl: 'pilot-list.component.html',
  styleUrls: ['pilot-list.component.scss']
})
export class PilotListComponent implements OnInit {
  @Input() characters: ZKillStats[];
  @Input() hovered: Hovered;

  constructor(
    private allianceInformationService: AllianceInformationService
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

  allianceTag(allianceID: number): string {
    return this.allianceInformationService.getTag(allianceID);
  }

  sorted(characters: ZKillStats[]): ZKillStats[] {
    characters.sort((a, b) => b.iskDestroyed - a.iskDestroyed);
    return characters;
  }
}
