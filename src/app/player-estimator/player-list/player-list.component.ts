import { Component, Input, OnInit } from '@angular/core';

import { CharacterStats } from '../../api/z-killboard/character-stats';
import { ShortnumberPipe } from '../../shortnumber.pipe';

@Component({
  moduleId: module.id,
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

  sorted(characters: CharacterStats[]): CharacterStats[] {
    // TODO: sort
    return characters;
  }
}
