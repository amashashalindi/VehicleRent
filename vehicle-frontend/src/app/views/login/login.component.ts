import { Component } from '@angular/core';
import { ApiService } from '../../apis.service';
import { Constants } from '../../constants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  // user details
  userData: any = {
    userName: '',
    password: ''
  };
  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit() { }
  // user login function
  login() {
    this.apiService.getresponse(Constants.METHODS.GET, `auth/login?username=${this.userData.userName}&password=${this.userData.password}`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, {}, null).subscribe(data => {
        if (data.user) {
          localStorage.setItem(Constants.LOGGEDIN, 'true');
          localStorage.setItem(Constants.USER, JSON.stringify(data.user));
          this.gotoHome(data.user);
        }
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.INFO, 'Login', data.message);
      }, error => {
    console.log(error);
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Login', 'Invalid Credentials');
      });
  }


  gotoHome(user) {
    localStorage.setItem(Constants.USER_NAME, user.userName);
    this.router.navigate(['rented-vehicles']);
  }
  gotoRegister() {
    this.router.navigate(['register']);
  }

}
