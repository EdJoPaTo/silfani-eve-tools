import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-itemname',
  templateUrl: 'itemname.component.html',
  styleUrls: ['itemname.component.scss']
})
export class ItemnameComponent implements OnInit {
  @Input() amount: number;
  @Input() id: number;
  @Input() small: boolean;
  name = 'NAME';

  constructor() { }

  ngOnInit() {
  }

}
