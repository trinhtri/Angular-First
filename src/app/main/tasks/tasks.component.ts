import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { TaskServiceProxy,TaskEmployeeDto ,CreateTaskInput, TaskListDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TaskState } from '@shared/AppEnums';
import { AddOrEditModalComponent } from './add-or-edit-modal.component';
import { EmployeeModalComponent } from './employee-modal.component';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent extends AppComponentBase implements OnInit {

  // tasks: TaskListDto[] = [];
  tasks:TaskEmployeeDto[]=[];
  selectedState: TaskState;
  selectedtask:string;
  
  @ViewChild('addOrEditTaskModal') addOrEditTaskModal: AddOrEditModalComponent;
  @ViewChild ('getAllEmployees') getAllEmployees:EmployeeModalComponent;

  stateSelectOptions = [
    { text: this.l("AllTasks"), value: undefined },
    { text: this.l('TaskState_Open'), value: TaskState.Open },
    { text: this.l('TaskState_Completed'), value: TaskState.Completed }
  ]


  constructor(injector: Injector, private taskService: TaskServiceProxy) {
    super(injector);
  }


  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getAll(this.selectedState as any).subscribe(result => {
      this.tasks = result.items;
    });
  }


  getTaskLabel(task: TaskEmployeeDto) {
    return task.state === TaskState.Open
      ? 'lable-succes'
      : "Lable-default";
  }


  getTaskState(task: TaskEmployeeDto) {
    switch (task.state) {
      case TaskState.Open:
        return this.l('TaskState_Open');
      case TaskState.Completed:
        return this.l('TaskState_Completed');
      default:
        return '';
    }
  }

  
  showTaskModal(id) {
    this.addOrEditTaskModal.show(id);
  }
 

  showAllTaskModal(id){
    this.getAllEmployees.getEmployees(id);  
  }


  onTaskUpdated(task: TaskEmployeeDto) {
    if (task) {
      this.tasks.push(task);
      this.getTasks();
    }
    else {
      this.getTasks();
    }
    this.notify.success(this.l('Saved Successlly'));
  }


  Del(id): void {
    this.message.confirm(
      " You want to delete this task",
      (isConfirmed) => {
        if (isConfirmed) {
          this.taskService.delete(id).subscribe(
            result => {
              var index = this.tasks.findIndex(x =>x.id== result);
              this.tasks.splice(index, 1);
            }
          );    
        }
      }
    );
  }
}
