import { Component, Input, OnInit } from '@angular/core';

import { ZKillStats } from '../../api/z-killboard/z-kill-stats';
import { AllianceInformationService } from '../../api/eve-crest/alliance-information.service';
import { Hovered } from '../hovered';
import { ShortnumberPipe } from '../../shortnumber.pipe';

function percentage(destroyed, lost) {
  if (destroyed + lost > 0) {
    return destroyed / (destroyed + lost);
  } else {
    return 0;
  }
}

@Component({
  selector: 'app-pilot-list',
  templateUrl: 'pilot-list.component.html',
  styleUrls: ['pilot-list.component.scss']
})
export class PilotListComponent implements OnInit {
  @Input() characters: ZKillStats[];
  @Input() hovered: Hovered;
  percentFormat = '1.1-1';

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

  shipPercentage(character: ZKillStats) {
    return percentage(character.shipsDestroyed, character.shipsLost);
  }

  pointPercentage(character: ZKillStats) {
    return percentage(character.pointsDestroyed, character.pointsLost);
  }

  iskPercentage(character: ZKillStats) {
    return percentage(character.iskDestroyed, character.iskLost);
  }

  allianceTag(allianceID: number): string {
    return this.allianceInformationService.getTag(allianceID);
  }

  sorted(characters: ZKillStats[]): ZKillStats[] {
    characters.sort((a, b) => b.iskDestroyed - a.iskDestroyed);
    return characters;
  }
}
