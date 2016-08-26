import { Component, Input, OnInit } from '@angular/core';

import { CharacterStats } from '../../api/z-killboard/character-stats';
import { AllianceInformationService } from '../../api/eve-crest/alliance-information.service';
import { Hovered } from '../hovered';
import { GroupcountPipe } from './groupcount.pipe';

@Component({
  selector: 'app-pilot-group-list',
  templateUrl: 'pilot-group-list.component.html',
  styleUrls: ['pilot-group-list.component.scss'],
  pipes: [GroupcountPipe]
})
export class PilotGroupListComponent implements OnInit {
  @Input() characters: CharacterStats[];
  @Input() hovered: Hovered;

  constructor(
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

  allianceName(allianceID: number): string {
    return this.allianceInformationService.getName(allianceID);
  }
}
