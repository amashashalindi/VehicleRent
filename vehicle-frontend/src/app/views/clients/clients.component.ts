import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../apis.service';
import { Constants } from '../../constants';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  all_clients: any[];

  client: any = {};
  form_title: string;
  button_title: string;
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.all_clients = [];
    this.apiService.getresponse(Constants.METHODS.GET, `clients`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, {}, null).subscribe(data => {
        this.all_clients = data.response;
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }

  openModal(modal,data) {
    if (data) {
      this.button_title = "Update";
      this.form_title = "Update Client";
      this.client = data;
    } else {
      this.button_title = "Save";
      this.form_title = "Save Client";
    }
    modal.show();
  }
  addOrUpdateClient(modal){
    if (this.client._id) {
      this.updateClient(modal);
    } else {
      this.addNewClient(modal);
    }
  }
  addNewClient(modal) {
    this.client.userId = JSON.parse(localStorage.getItem(Constants.USER))._id
    this.apiService.getresponse(Constants.METHODS.POST, `clients`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, this.client, null).subscribe(data => {
        modal.hide();
        this.getAllClients();
        this.client = {};
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }
  deleteClient(modal){
    this.apiService.getresponse(Constants.METHODS.DELETE, `clients/${this.client._id}`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, {}, null).subscribe(data => {
        modal.hide();
        this.getAllClients();
        this.client = {};
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }
  updateClient(modal) {
    this.client.userId = JSON.parse(localStorage.getItem(Constants.USER))._id
    this.apiService.getresponse(Constants.METHODS.PUT, `clients/${this.client._id}`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, this.client, null).subscribe(data => {
        modal.hide();
        this.getAllClients();
        this.client = {};
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }
}