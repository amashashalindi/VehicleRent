import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Constants } from './constants';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: "<router-outlet></router-outlet> <ngx-loading-bar></ngx-loading-bar>"
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    if (localStorage.getItem(Constants.USER)) {
      if (localStorage.getItem(Constants.CURRENT_PAGE)) {
        this.router.navigate([localStorage.getItem(Constants.CURRENT_PAGE)]);
      } else {
        // this.router.navigate([Constants.DEFAULT_PAGE]);
        this.router.navigate(['rented-vehicles']);
      }
    } else {
      this.router.navigate([Constants.DEFAULT_PAGE]);
    }

  }
}
