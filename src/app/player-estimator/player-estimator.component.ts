import { Component, OnInit } from '@angular/core';

import { CharacterStats } from '../api/z-killboard/character-stats';
import { CharacterStatsService } from '../api/z-killboard/character-stats.service';

@Component({
  moduleId: module.id,
  selector: 'app-player-estimator',
  templateUrl: 'player-estimator.component.html',
  styleUrls: ['player-estimator.component.css'],
  providers: [CharacterStatsService]
})
export class PlayerEstimatorComponent implements OnInit {
  character: CharacterStats;

  constructor(
    private characterStatsService: CharacterStatsService
  ) { }

  ngOnInit() {
    let characterID: number = 90419497;
    this.characterStatsService.get(characterID)
      .then(stats => this.character = stats);
  }

}
