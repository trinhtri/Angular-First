import { Component, OnInit, Injector, ViewChild, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EmployeeServiceProxy, EmployeeDto, EmployeeListDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
// import { months } from 'moment';
import * as moment from 'moment';
@Component({
  selector: 'addOrEditEmployeeModal',
  templateUrl: './add-or-edit-employyee-modal.component.html',
  styleUrls: ['./add-or-edit-employyee-modal.component.css']
})
export class AddOrEditEmployyeeModalComponent extends AppComponentBase{

  @ViewChild('createOrEditModal') modal: ModalDirective;
  @ViewChild('birthdayUtc') birtDUtc: ElementRef;

  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  saving = false;
  emp: EmployeeDto = new EmployeeDto();
  constructor(injector: Injector, private employeeService: EmployeeServiceProxy) {
    super(injector);
  }
  
ngAfterViewInit(): void {
  // default date picker
  $(this.birtDUtc.nativeElement).datetimepicker({
      locale: abp.localization.currentLanguage.name,
      format: 'L'
  });
}


  show(id): void {
    if (id != null) {
      this.employeeService.get(id).subscribe(result => { this.emp = result });
    }   
    this.active = true;
    this.modal.show();
  }

  
  save(): void {
    this.saving = true;
    if (this.emp.id != null) {
      let date = $(this.birtDUtc.nativeElement).data('DateTimePicker').date();
            if (!date) {
                date = this.emp.birthDay;
            }
            this.emp.birthDay = moment(date.format('YYYY-MM-DDTHH:mm:ss') + 'Z');
      this.employeeService.edit(this.emp).finally(() => { this.saving = false; })
        .subscribe(result => this.modalSave.emit());        
    }

    else {
      let date = $(this.birtDUtc.nativeElement).data('DateTimePicker').date();
      if (!date) {
          date = this.emp.birthDay;
      }
      this.emp.birthDay = moment(date.format('YYYY-MM-DDTHH:mm:ss') + 'Z');
      this.employeeService.create(this.emp).finally(() => { this.saving == false; })
      .subscribe(result => {
        this.modalSave.emit(result);
      });
    }
    this.close();
  }

  close(): void {
    this.emp = new EmployeeDto();
    this.active = false;
    this.modal.hide();
  }

onShown(): void {
  $(this.birtDUtc.nativeElement).datetimepicker({
      locale: abp.localization.currentLanguage.name,
      format: 'L'
  }); 
}

formatDate(date:any):string{
  if(!this.emp.birthDay){
    return '';
  }
  if(!date){
    return '';
  }
  return moment(date).format('L');
}

}
