import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditEmployyeeModalComponent } from './add-or-edit-employyee-modal.component';

describe('AddOrEditEmployyeeModalComponent', () => {
  let component: AddOrEditEmployyeeModalComponent;
  let fixture: ComponentFixture<AddOrEditEmployyeeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditEmployyeeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditEmployyeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
