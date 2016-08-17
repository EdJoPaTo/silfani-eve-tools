import { Component } from '@angular/core';
import { PlayerEstimatorComponent } from './player-estimator';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [PlayerEstimatorComponent]
})
export class AppComponent {
  title = 'EVE Angular2 Tools';
}
