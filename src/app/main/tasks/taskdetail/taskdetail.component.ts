import { Component, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { TaskServiceProxy, CreateTaskInput} from '@shared/service-proxies/service-proxies';
import { Location } from '@angular/common';
import { TaskState } from '@shared/AppEnums';
@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrls: ['./taskdetail.component.css']
})
export class TaskdetailComponent extends AppComponentBase implements OnInit {

  task:CreateTaskInput=new CreateTaskInput();
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    injector:Injector,
    private _activatedRouter:ActivatedRoute,
    private _taskSevervice:TaskServiceProxy,
    private _location:Location
    ) {
    super(injector);
  }
  ngOnInit() {
    this.getTask();
  }
 getTask():void{
   //cách lấy id
   const id=+this._activatedRouter.snapshot.paramMap.get('id');
   //lấy dữ liệu ra từ csdl
   this._taskSevervice.getId(id).subscribe(result => { 
    this.task = result ; 
  });
 }

 stateSelectOptions = [
  { text: this.l('--Select TaskState--'), value: undefined },
  { text: this.l('TaskState_Open'), value: TaskState.Open },
  { text: this.l('TaskState_Completed'), value: TaskState.Completed },
]

  save():void{
    this._taskSevervice.edit(this.task).subscribe(result=>this.modalSave.emit());
    this.close();
  }

  
  close() {
    this._location.back();
  }


}
