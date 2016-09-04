import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mineable-table',
  templateUrl: 'mineable-table.component.html',
  styleUrls: ['mineable-table.component.scss']
})
export class MineableTableComponent implements OnInit {
  // market groups
  // 54 ores
  // veldspar 518
  // pyroxeres 515
  // ice 1855
  // gas 983
  // whgas 1859

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  select(id: number, amount = 1) {
    let routeParams: any = {id: id};

    if (amount !== 1) {
      routeParams.amount = amount;
    }

    this.router.navigate([routeParams]);
  }
}
