import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MissionService } from '../api/static-resources';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  missions = [];
  namefilter: string;
  level1enabled: boolean;
  level2enabled: boolean;
  level3enabled: boolean;
  level4enabled: boolean;
  level5enabled: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.missionService.get()
      .subscribe(json => {
        this.missions = json;
      });
    this.sub = this.route.params.subscribe(params => {
      this.level1enabled = !params['noL1'];
      this.level2enabled = !params['noL2'];
      this.level3enabled = !params['noL3'];
      this.level4enabled = !params['noL4'];
      this.level5enabled = params['L5'];
      this.namefilter = params['namefilter'] ? params['namefilter'] : '';
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateUrl(level1: boolean, level2: boolean, level3: boolean, level4: boolean, level5: boolean) {
    const params: any = {};
    if (!level1) { params.noL1 = true; }
    if (!level2) { params.noL2 = true; }
    if (!level3) { params.noL3 = true; }
    if (!level4) { params.noL4 = true; }
    if (level5) { params.L5 = true; }
    if (this.namefilter) { params.namefilter = this.namefilter; }
    this.router.navigate([params]);
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
