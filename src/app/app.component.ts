import { Component } from '@angular/core';
import { PlayerEstimatorComponent } from './player-estimator';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [PlayerEstimatorComponent]
})
export class AppComponent {
  title = 'app works!';
}
