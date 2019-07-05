import { Component, OnInit, EventEmitter, Output, ViewChild, Injector, Input } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TaskServiceProxy, CreateTaskInput } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';
import { TaskState } from '@shared/AppEnums';
import * as moment from 'moment';
import { DateRangeDirective } from '../date-range.directive';
import { DateRangePickerComponent } from '@app/shared/common/timing/date-range-picker.component';
@Component({
  selector: 'addOrEditTaskModal',
  templateUrl: './add-or-edit-modal.component.html',
  styleUrls: ['./add-or-edit-modal.component.css']
})
export class AddOrEditModalComponent extends AppComponentBase implements OnInit {

 date:DateRangePickerComponent;
  @ViewChild('createOrEditModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active = false;
  saving = false;

  dateRangePickerStartDate: moment.Moment;
  dateRangePickerEndDate: moment.Moment;
  
  stateSelectOptions = [
    { text: this.l('--Select TaskState--'), value: undefined },
    { text: this.l('TaskState_Open'), value: TaskState.Open },
    { text: this.l('TaskState_Completed'), value: TaskState.Completed },
  ]

  task: CreateTaskInput = new CreateTaskInput(); 
  constructor(injector: Injector, private taskService: TaskServiceProxy) {
   super(injector);
  
  }
  ngOnInit() {
  }


  show(id): void
   {
    if (id != null) {
      this.taskService.getId(id).subscribe(result => { 
        this.task = result ; 
      });
    }
    this.active = true;
    this.modal.show();
}


save(): void {
    this.saving = true;
    if (this.task.id != undefined &&this.task.id != 0) {
      this.taskService.edit(this.task).finally(() => { this.saving = false; })
        .subscribe(result => this.modalSave.emit());
    }
    else 
    {
      // this.task.dateStart=this.dateRangePickerStartDate;
      // this.task.dateEnd=this.dateRangePickerEndDate;
      this.taskService.create(this.task).finally(() => { this.saving = false; })
        .subscribe(result => {
         this.modalSave.emit(result);
        });
    }
    this.close();
 }
 close(): void { 
    this.active = false;
    this.modal.hide();
  }
}

