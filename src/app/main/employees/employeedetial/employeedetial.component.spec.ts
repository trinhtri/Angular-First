import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedetialComponent } from './employeedetial.component';

describe('EmployeedetialComponent', () => {
  let component: EmployeedetialComponent;
  let fixture: ComponentFixture<EmployeedetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeedetialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeedetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
