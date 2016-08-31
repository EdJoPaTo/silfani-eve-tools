import { Component, OnInit, Input } from '@angular/core';

import { PricetableComponent } from './pricetable';

import { Item } from '../item';

@Component({
  selector: 'app-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss'],
  directives: [
    PricetableComponent
  ]
})
export class DetailsComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }
}
