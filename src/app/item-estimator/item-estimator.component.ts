import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-estimator',
  templateUrl: './item-estimator.component.html',
  styleUrls: ['./item-estimator.component.scss']
})
export class ItemEstimatorComponent implements OnInit {
  input = `3.000  Veldspar
2  Logic Circuit
XR-3200 Heavy Missile Bay
Fried Interface Circuit  30  Salvaged Materials  0,30 m3
Power Circuit  2  Salvaged Materials  0,02 m3
Sisters Core Scanner Probe  8  Scanner Probe  0,80 m3
`;

  constructor() { }

  ngOnInit() {

  }

}
