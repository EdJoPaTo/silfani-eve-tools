import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ZKillStats, ZKillStatsService } from '../../api/z-killboard';
import { AllianceInformationService } from '../../api/eve-crest';
import { Hovered } from '../hovered';

@Component({
  selector: 'app-pilot-group-list',
  templateUrl: './pilot-group-list.component.html',
  styleUrls: ['./pilot-group-list.component.scss']
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
    const stats = this.allianceStats(allianceID);
    return stats ? stats.info.name : 'loading...';
  }

  allianceTag(allianceID: number): Observable<string> {
    return this.allianceInformationService.getTag(allianceID);
  }

  corpStats(corporationID: number): ZKillStats {
    return this.zKillStatsService.corporationCached(corporationID);
  }

  corpName(corporationID: number): string {
    const stats = this.corpStats(corporationID);
    return stats ? stats.info.name : 'loading...';
  }
}
