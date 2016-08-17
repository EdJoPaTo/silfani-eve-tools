import { Component, Input, OnInit } from '@angular/core';

import { CharacterStats } from '../../api/z-killboard/character-stats';
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
  percentFormat = '1.1-1';

  constructor() { }

  ngOnInit() {
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

  sorted(characters: CharacterStats[]): CharacterStats[] {
    // TODO: sort
    return characters;
  }
}
