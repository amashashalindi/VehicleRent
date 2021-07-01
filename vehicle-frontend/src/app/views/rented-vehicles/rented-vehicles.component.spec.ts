import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedVehiclesComponent } from './rented-vehicles.component';

describe('RentedVehiclesComponent', () => {
  let component: RentedVehiclesComponent;
  let fixture: ComponentFixture<RentedVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentedVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentedVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
