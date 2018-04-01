import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  public pageTitle: string = 'Welcome';
}
