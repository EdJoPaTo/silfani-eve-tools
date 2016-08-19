import { Component, Input, OnInit } from '@angular/core';

import { CharacterStats } from '../../api/z-killboard/character-stats';
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
  selector: 'app-player-list',
  templateUrl: 'player-list.component.html',
  styleUrls: ['player-list.component.css'],
  pipes: [ShortnumberPipe]
})
export class PlayerListComponent implements OnInit {
  @Input() characters: CharacterStats[];
  @Input() hovered: Hovered;
  percentFormat = '1.1-1';

  constructor(
    private allianceInformationService: AllianceInformationService
  ) { }

  ngOnInit() {
  }

  mouseenter(character: CharacterStats) {
    this.hovered.corporationID = character.info.corporationID;
    this.hovered.allianceID = character.info.allianceID || null;
  }

  mouseleave(character: CharacterStats) {
    this.hovered.corporationID = null;
    this.hovered.allianceID = null;
  }

  shipPercentage(character: CharacterStats) {
    return percentage(character.shipsDestroyed, character.shipsLost);
  }

  pointPercentage(character: CharacterStats) {
    return percentage(character.pointsDestroyed, character.pointsLost);
  }

  iskPercentage(character: CharacterStats) {
    return percentage(character.iskDestroyed, character.iskLost);
  }

  allianceTag(allianceID: number): string {
    return this.allianceInformationService.getTag(allianceID);
  }

  sorted(characters: CharacterStats[]): CharacterStats[] {
    characters.sort((a, b) => b.iskDestroyed - a.iskDestroyed);
    return characters;
  }
}
