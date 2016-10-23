import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from '../item';

@Component({
  selector: 'app-mineral-table',
  templateUrl: 'mineral-table.component.html',
  styleUrls: ['mineral-table.component.scss']
})
export class MineralTableComponent implements OnInit {
  @Output() onSelect = new EventEmitter<Item>();
  // market groups
  // minerals 1857
  // ice products 1033

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  select(id: number, amount = 1) {
    this.onSelect.emit({ id: id, amount: amount });
  }
}
