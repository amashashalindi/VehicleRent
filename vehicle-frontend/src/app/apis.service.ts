import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private readonly http: HttpClient, private toastr: ToastrService) { }

  getresponse(method: string, endpoint: string, content_type: string | string[], postParams: any, res_type: String): Observable<any> {

    let url = `http://${Constants.baseUrl}/` + endpoint

    switch (res_type) {
      case Constants.RESPONSE_RETURN_TYPES.HEADERS:
        return this.http.request(method, url, { body: postParams, observe: 'response' });
      case Constants.RESPONSE_TYPES.TEXT:
        return this.http.request(method, url, { body: postParams, responseType: 'text' });
      default:
        return this.http.request(method, url, { body: postParams,});
    }
  }

  /** returning notification alert*/
  showNotification(type, message, title) {
    var options = { closeButton: true }
    switch (type) {
      case Constants.NOTIFICATION_TYPES.SUCCESS:
        this.toastr.success(title, message, options);
        break;
      case Constants.NOTIFICATION_TYPES.ERORR:
        this.toastr.error(title, message, options);
        break;
      case Constants.NOTIFICATION_TYPES.INFO:
        this.toastr.info(title, message, options);
        break;
    }
  }
}
