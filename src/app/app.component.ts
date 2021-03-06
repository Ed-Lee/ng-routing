import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
  loading: boolean = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.router.events.subscribe(
      (routerEvent: Event) => {
        this.checkRouterEvent(routerEvent);
      }
    )
  }

  displayMessage() {
    this.router.navigate([{outlets: {popup: ['message']}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessage() {
    this.messageService.isDisplayed = false;
    this.router.navigate([{outlets: {popup: null}}]);
  }


  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigate(['/welcome']);
  }
}
