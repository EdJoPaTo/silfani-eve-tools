import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-destroyed-lost',
  templateUrl: 'destroyed-lost.component.html',
  styleUrls: ['destroyed-lost.component.scss']
})
export class DestroyedLostComponent implements OnInit {
  @Input() title: string;
  @Input() isInteger = false;
  @Input() destroyed: number;
  @Input() lost: number;
  percentFormat = '1.1-1';

  constructor() { }

  ngOnInit() {
  }

  percentage(destroyed, lost) {
    if (destroyed + lost > 0) {
      return destroyed / (destroyed + lost);
    } else {
      return 0;
    }
  }
}
