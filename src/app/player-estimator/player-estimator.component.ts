import { Component, OnInit } from '@angular/core';

import { CharacterStats } from '../api/z-killboard/character-stats';
import { CharacterStatsService } from '../api/z-killboard/character-stats.service';
import { PlayerListComponent } from './player-list';
import { PlayerGroupListComponent } from './player-group-list';

@Component({
  moduleId: module.id,
  selector: 'app-player-estimator',
  templateUrl: 'player-estimator.component.html',
  styleUrls: ['player-estimator.component.css'],
  directives: [PlayerGroupListComponent, PlayerListComponent],
  providers: [CharacterStatsService]
})
export class PlayerEstimatorComponent implements OnInit {
  characters: CharacterStats[] = [];
  input: string;

  constructor(
    private characterStatsService: CharacterStatsService
  ) { }

  ngOnInit() {
    let characterIDs = [91572014, 90419497]; // TODO: dynamic
    characterIDs.forEach(id => this.characterStatsService.get(id)
      .then(stats => {
        this.characters.push(stats);
      }));

    this.input = 'Rell Silfani\nKarnis Delvari\n';
  }

  rows(input: string): number {
    return input.split('\n').length + 4;
  }
}
