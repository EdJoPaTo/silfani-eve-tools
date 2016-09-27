import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ZKillStats } from '../../api/z-killboard/z-kill-stats';
import { ZKillStatsService } from '../../api/z-killboard/z-kill-stats.service';
import { AllianceInformationService } from '../../api/eve-crest/alliance-information.service';
import { Hovered } from '../hovered';

@Component({
  selector: 'app-pilot-group-list',
  templateUrl: 'pilot-group-list.component.html',
  styleUrls: ['pilot-group-list.component.scss']
})
export class PilotGroupListComponent implements OnInit {
  @Input() characters: ZKillStats[];
  @Input() hovered: Hovered;

  constructor(
    private zKillStatsService: ZKillStatsService,
    private allianceInformationService: AllianceInformationService
  ) { }

  ngOnInit() {
  }

  mouseenter(obj: any) {
    this.hovered.corporationID = obj.corporationID || null;
    this.hovered.allianceID = obj.allianceID || null;
  }

  mouseleave(obj: any) {
    this.hovered.corporationID = null;
    this.hovered.allianceID = null;
  }

  allianceStats(allianceID: number): ZKillStats {
    return this.zKillStatsService.allianceCached(allianceID);
  }

  allianceName(allianceID: number): string {
    let stats = this.allianceStats(allianceID);
    return stats ? stats.info.name : 'loading...';
  }

  allianceTag(allianceID: number): string {
    return this.allianceInformationService.getTag(allianceID);
  }

  corpStats(corporationID: number): ZKillStats {
    return this.zKillStatsService.corporationCached(corporationID);
  }

  corpName(corporationID: number): string {
    let stats = this.corpStats(corporationID);
    return stats ? stats.info.name : 'loading...';
  }
}
