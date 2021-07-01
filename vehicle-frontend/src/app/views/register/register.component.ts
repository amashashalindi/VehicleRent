import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../apis.service';
import { Constants } from '../../constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // user details
  userData: any = {
    userName: '',
    email: '',
    password: '',
    contactNo: '',
    type: 1,
  };
  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit() { }
  // user register function
  register() {
    this.apiService.getresponse(Constants.METHODS.POST, `auth/register`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, this.userData, null).subscribe(data => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.INFO, 'Signup', data.message);
        if (data.user) {
          this.gotoLogin();
        }
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Signup', 'something went wrong');
      });
  }
  gotoLogin() {
    this.router.navigate(['login']);
  }
}
