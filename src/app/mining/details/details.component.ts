import { Component, OnInit, Input } from '@angular/core';

import { ItemnameComponent } from './itemname';
import { PricetableComponent } from './pricetable';
import { ReprocesstableComponent } from './reprocesstable';

import { Item } from '../item';

@Component({
  selector: 'app-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss'],
  directives: [
    ItemnameComponent,
    PricetableComponent,
    ReprocesstableComponent
  ]
})
export class DetailsComponent implements OnInit {
  @Input() item: Item;
  myAmount = 1;

  constructor() { }

  ngOnInit() {
  }
}
