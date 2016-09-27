import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../item';

@Component({
  selector: 'app-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() item: Item;
  myAmount = 1;

  constructor() { }

  ngOnInit() {
  }
}
