import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../apis.service';
import { Constants } from '../../constants';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  all_vehicles: any[];

  vehicle: any = {};
  form_title: string;
  button_title: string;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllVehicles();
  }

  getAllVehicles() {
    this.all_vehicles = [];
    this.apiService.getresponse(Constants.METHODS.GET, `vehicles`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, {}, null).subscribe(data => {
        this.all_vehicles = data.response;
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }

  openModal(modal,data) {
    if (data) {
      this.button_title = "Update";
      this.form_title = "Update Vehicle";
      this.vehicle = data;
    } else {
      this.button_title = "Save";
      this.form_title = "Save Vehicle";
    }
    modal.show();
  }
  addOrUpdateClient(modal){
    if (this.vehicle._id) {
      this.updateVehicle(modal);
    } else {
      this.addNewVehicle(modal);
    }
  }
  addNewVehicle(modal) {
    this.vehicle.userId = JSON.parse(localStorage.getItem(Constants.USER))._id
    this.apiService.getresponse(Constants.METHODS.POST, `vehicles`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, this.vehicle, null).subscribe(data => {
        modal.hide();
        this.getAllVehicles();
        this.vehicle = {};
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }

  deleteVehicle(modal){
    this.apiService.getresponse(Constants.METHODS.DELETE, `vehicles/${this.vehicle._id}`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, {}, null).subscribe(data => {
        modal.hide();
        this.getAllVehicles();
        this.vehicle = {};
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }
  updateVehicle(modal) {
    this.apiService.getresponse(Constants.METHODS.PUT, `vehicles/${this.vehicle._id}`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, this.vehicle, null).subscribe(data => {
        modal.hide();
        this.getAllVehicles();
        this.vehicle = {};
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }
}
