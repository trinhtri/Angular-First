import { Component, OnInit, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { EmployeeServiceProxy, TaskServiceProxy, EmployeeListDto, EmployeeDto,TaskEmployeeDto, CreateInvoiceDto, CreateTaskInput } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'employeeModal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent extends AppComponentBase implements OnInit {

  @ViewChild('emplModal') modal: ModalDirective;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  empls: EmployeeListDto[] = [];
  filterText:string;

  constructor(injector: Injector, private employesService: EmployeeServiceProxy, private taskService: TaskServiceProxy) {
    super(injector);
  }

  ngOnInit() {
  }

  action = false;
  saving = false;
  task: CreateTaskInput = new CreateTaskInput();
  employee: EmployeeDto = new EmployeeDto();
  //   show(id): void {
  //     if (id != null) {
  //         this.taskService.getId(id).subscribe(
  //             result => { this.task = result }
  //         );
  //     }
  //     this.action = true;
  //     this.modal.show();
  // }

  
  getEmployees(id){
    if (id != null) {
      this.taskService.getId(id).subscribe(result => { 
        this.task = result ; 
      });
    }
    this.employesService.getAll(this.filterText).subscribe(
      result => { this.empls = result.items }
    );
    this.action = true;
    this.modal.show();
  }


  save(): void {
    this.saving = true;
    this.task.employeeId = this.employee.id;
    this.taskService.edit(this.task).finally(() => { this.saving = false; })
      .subscribe(result => this.modalSave.emit(result));
    this.close();
  }

  close(): void {
    this.action = false;
    this.modal.hide();
  }
}
