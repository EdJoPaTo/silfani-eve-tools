import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MissionService } from '../api/static-resources/mission.service';
import { MissionListComponent } from './mission-list';

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
  pipes: [DetailedinfoPipe, InfoiconPipe, InfotitlePipe],
  providers: [MissionService]
})
export class MissionsComponent implements OnInit {
  private missions = [];
  private filterTerms = new Subject<string>();
  private filtered = [];

  constructor(
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.missionService.get()
      .subscribe(json => {
        this.missions = json;
        this.filter('');
      });

    this.filterTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .map(term => this.getMissionsBasedOnTerm(term))
      .subscribe(result => this.filtered = result);
  }

  filter(term: string) {
    if (this.missions.length === 0) {
      return;
    }
    this.filterTerms.next(term);
  }

  getMissionsBasedOnTerm(term: string): any[] {
    term = term.toLowerCase();
    if (!this.missions) { return []; }

    return this.missions.filter(mission => {
      if (mission.name.en.toLowerCase().indexOf(term) >= 0) {
        return true;
      }
      if (mission.name.de.toLowerCase().indexOf(term) >= 0) {
        return true;
      }
    });
  }
}
