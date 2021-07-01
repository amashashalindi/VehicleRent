import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { VehiclesComponent } from './views/vehicles/vehicles.component';
import { ClientsComponent } from './views/clients/clients.component';
import { RentedVehiclesComponent } from './views/rented-vehicles/rented-vehicles.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'rented-vehicles',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
    {
      path: 'vehicles',
      component: VehiclesComponent,
      data: {
        title: 'Vehicles'
      }
    },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
    {
      path: 'clients',
      component: ClientsComponent,
      data: {
        title: 'Clients'
      }
    },
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
    {
      path: 'rented-vehicles',
      component: RentedVehiclesComponent,
      data: {
        title: 'Rented Vehicles'
      }
    },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
