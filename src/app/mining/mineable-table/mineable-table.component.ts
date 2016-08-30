import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mineable-table',
  templateUrl: 'mineable-table.component.html',
  styleUrls: ['mineable-table.component.scss']
})
export class MineableTableComponent implements OnInit {

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
