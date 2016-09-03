import { Component, OnInit } from '@angular/core';

import { MissionService } from '../api/static-resources/mission.service';
import { MissionListComponent } from './mission-list';

import { NameFilterPipe } from './name-filter.pipe';
import { LevelFilterPipe } from './level-filter.pipe';
import { DetailedinfoPipe } from './detailedinfo.pipe';
import { InfoiconPipe } from './infoicon.pipe';
import { InfotitlePipe } from './infotitle.pipe';

@Component({
  selector: 'app-missions',
  templateUrl: 'missions.component.html',
  styleUrls: ['missions.component.scss'],
  directives: [
    MissionListComponent
  ],
  pipes: [
    NameFilterPipe,
    LevelFilterPipe,
    DetailedinfoPipe,
    InfoiconPipe,
    InfotitlePipe
  ],
  providers: [MissionService]
})
export class MissionsComponent implements OnInit {
  private missions = [];
  namefilter = '';
  level1enabled = true;
  level2enabled = true;
  level3enabled = true;
  level4enabled = true;
  level5enabled = false;

  constructor(
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.missionService.get()
      .subscribe(json => {
        this.missions = json;
      });
  }

  resetAllFilters() {
    this.namefilter = '';
    this.level1enabled = true;
    this.level2enabled = true;
    this.level3enabled = true;
    this.level4enabled = true;
    this.level5enabled = false;
  }
}
