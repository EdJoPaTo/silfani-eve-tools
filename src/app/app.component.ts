import { Component } from '@angular/core';
import { PilotAnalyzerComponent } from './pilot-analyzer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [PilotAnalyzerComponent]
})
export class AppComponent {
  title = 'EVE Angular2 Tools';
}
