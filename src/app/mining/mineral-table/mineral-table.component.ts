import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mineral-table',
  templateUrl: 'mineral-table.component.html',
  styleUrls: ['mineral-table.component.scss']
})
export class MineralTableComponent implements OnInit {

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
