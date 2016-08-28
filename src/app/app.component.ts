import { Component } from '@angular/core';
import { NavbarComponent } from './navbar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  directives: [NavbarComponent]
})
export class AppComponent {
  title = 'Silfani EVE Tools';
}
