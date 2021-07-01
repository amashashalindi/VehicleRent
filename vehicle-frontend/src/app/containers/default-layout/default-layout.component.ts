import { Component, OnDestroy } from '@angular/core';
import { navItems } from '../../_nav';
import { ApiService } from '../../apis.service';
import { Constants } from '../../constants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  allshoplist: any;
  selected_tenant: string;

  constructor(private apiService: ApiService, private router: Router) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });
    this.element = document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit() {
    this.selected_tenant = localStorage.getItem(Constants.USER_NAME);
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  /* opening userpool */
  goToSettings() {
  }

}
