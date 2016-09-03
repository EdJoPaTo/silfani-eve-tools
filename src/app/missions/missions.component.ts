import { Component, OnInit } from '@angular/core';

import { MissionService } from '../api/static-resources/mission.service';
import { MissionListComponent } from './mission-list';

import { NameFilterPipe } from './name-filter.pipe';
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
    DetailedinfoPipe,
    InfoiconPipe,
     InfotitlePipe
   ],
  providers: [MissionService]
})
export class MissionsComponent implements OnInit {
  private missions = [];
  namefilter = '';

  constructor(
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.missionService.get()
      .subscribe(json => {
        this.missions = json;
      });
  }
}
