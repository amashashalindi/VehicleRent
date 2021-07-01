import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { Location, PathLocationStrategy } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { RequestInterceptorService } from './request-interceptor.service';
import { ImageUploaderModule } from 'ngx-image-uploader';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { RegisterComponent } from './views/register/register.component';
import { VehiclesComponent } from './views/vehicles/vehicles.component';
import { ClientsComponent } from './views/clients/clients.component';
import { RentedVehiclesComponent } from './views/rented-vehicles/rented-vehicles.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    HttpModule,
    FormsModule,
    ImageUploaderModule,
    HttpClientModule,
    PerfectScrollbarModule,
    BsDatepickerModule.forRoot(),
    LoadingBarHttpClientModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <--  LazyLoadImage 
    }),
    ChartsModule, AlertModule.forRoot(),
    ReactiveFormsModule,
    SelectDropDownModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    RegisterComponent,
    VehiclesComponent,
    ClientsComponent,
    RentedVehiclesComponent,
  ],
  providers: [
    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // Location, { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
