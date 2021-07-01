import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../apis.service';
import { Constants } from '../../constants';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
const moment = require('moment');

@Component({
  selector: 'app-rented-vehicles',
  templateUrl: './rented-vehicles.component.html',
  styleUrls: ['./rented-vehicles.component.scss']
})
export class RentedVehiclesComponent implements OnInit {
  all_rent: any[];
  all_vehicles: any[];
  all_clients: any[];
  rent: any = {};
  dateFilter: any = {};
  vehicleConfig = {
    displayKey: 'vehicleName', // if objects array passed which key to be displayed defaults to description
    placeholder: 'Select a vehicle',
    search: false, // true/false for the search functionlity defaults to false,
    height: 'auto', // height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    // searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  clientConfig = {
    displayKey: 'clientName', // if objects array passed which key to be displayed defaults to description
    placeholder: 'Select a client',
    search: false, // true/false for the search functionlity defaults to false,
    height: 'auto', // height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    // searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  public locationModelChanged: Subject<string> = new Subject<string>();
  public locationSearchModelChangeSubscription: Subscription;
  currentPage: number;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllRentDetails();
    this.locationSearchModelChangeSubscription = this.locationModelChanged
      .pipe(debounceTime(1500), distinctUntilChanged()).subscribe($event => {
        this.currentPage = 1;
        //  this.getAllLocation($event);
      });
  }

  getAllRentDetails() {
    this.all_rent = [];
    this.apiService.getresponse(Constants.METHODS.GET, `rents`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, {}, null).subscribe(data => {
        this.all_rent = data.response;
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }

  openModal(modal, data) {
    if (data && data._id) {
      this.rent = data;
    } else {
      this.getAllClients();
      this.getAllVehicles();
    }
    modal.show();
  }
  addNewRent(modal) {
    const dates = this.dateDiffInDays(new Date(this.rent.boughtDate),
      new Date(this.rent.deliveryDate));
    this.rent.totalPrice = (dates * this.rent.Vehicle.rentalChargePerDay)
    this.rent.flag = 0
    this.apiService.getresponse(Constants.METHODS.POST, `rents`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, this.rent, null).subscribe(data => {
        modal.hide();
        this.getAllRentDetails();
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }

  vehicleSelectionChanged($event: any) {
    this.rent.vehicleId = $event.value._id;
    console.log($event);
    console.log(this.rent.vehicleId);
  }

  clientSelectionChanged($event: any) {
    this.rent.clientId = $event.value._id;
    console.log($event);
    console.log(this.rent.clientId);
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

  getAllVehicles() {
    this.all_vehicles = [];
    this.apiService.getresponse(Constants.METHODS.GET, `vehicles`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, {}, null).subscribe(data => {
        this.all_vehicles = data.response;
        this.rent = {};
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }

  deleteRent(modal) {
    this.apiService.getresponse(Constants.METHODS.DELETE, `rents/${this.rent._id}`,
      Constants.CONTENT_TYPES.APPLICATION_JSON, {}, null).subscribe(data => {
        modal.hide();
        this.getAllRentDetails();
        this.rent = {};
      }, error => {
        this.apiService.showNotification(Constants.NOTIFICATION_TYPES.ERORR, 'Error', 'Internal Server Error');
      });
  }

  filterAllRentData() {
    if (!this.dateFilter.start) {
      this.getAllRentDetails();
      return;
    }
    console.log("date Obj: ", this.dateFilter);
    
    var startDate = this.dateFilter.start;
    var endDate = this.dateFilter.end;

    let result = this.all_rent.filter(d => {var time = new Date(d.boughtDate).getTime();
      return (startDate < time && time < endDate);
     });
    this.all_rent = result;
  }
  dateDiffInDays(date1, date2) {
    // round to the nearest whole number
    return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
  }
  getDateFormat(date) {
    if (date) {
      return moment(Date.parse(date)).format('YYYY-MM-DD');
    } else {
      return '';
    }
  }
}
