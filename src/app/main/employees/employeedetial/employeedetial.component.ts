import { Component, OnInit, Input, ViewChild, Output, ElementRef, EventEmitter, Injector, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDto, EmployeeServiceProxy, EmployeeListDto } from '@shared/service-proxies/service-proxies';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';

// import {CalendarModule} from 'primeng/primeng';

import { AppComponentBase } from '@shared/common/app-component-base';
@Component({
  selector: 'employeedetial',
  templateUrl: './employeedetial.component.html',
  styleUrls: ['./employeedetial.component.css']
})

export class EmployeedetialComponent extends AppComponentBase implements OnInit {
  emp: EmployeeDto = new EmployeeDto();

  @ViewChild('birthdayUtc') birtDUtc: ElementRef;


  active = false;
  saving = false;

  constructor(
    injector: Injector,
    private _activatedRoute: ActivatedRoute,
    private employesService: EmployeeServiceProxy,
    private location: Location
  ) {
    super(injector);
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this._activatedRoute.snapshot.paramMap.get('id');
    this.employesService.get(id).subscribe(result => {
      this.emp = result;
    });
    this.active = true;
  }


  save(): void {
    
    this.employesService.edit(this.emp).finally(() => { this.saving = false; })
      .subscribe();
    this.close();
  }



  close(): void {
    this.location.back();
  }

}


