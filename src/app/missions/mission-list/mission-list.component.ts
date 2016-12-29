import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {
  @Input() missions: any[];
  @Input() maxElements: number;

  constructor() { }

  ngOnInit() {
  }

}
