import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigate(['/welcome']);
  }
}
