import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { EmployeeListDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AddOrEditEmployyeeModalComponent } from './add-or-edit-employyee-modal/add-or-edit-employyee-modal.component';

@Component({
  selector: 'appemployemodel',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeServiceProxy ]
})
export class EmployeesComponent  extends AppComponentBase implements OnInit{

  @ViewChild('addOrEditEmployeeModal') addOrEditEmployeeModal: AddOrEditEmployyeeModalComponent;
  employees: EmployeeListDto[] = [];
  filterText:string;
  selectedEmpls: EmployeeListDto[] = [];
  

  constructor(injector: Injector, private employesService: EmployeeServiceProxy,private _activatedRoute: ActivatedRoute) {
    super(injector);
    this.filterText = this._activatedRoute.snapshot.queryParams['filter'] || '';
  }

  ngOnInit() {
    this.getEmployees();
  }

  showEmployeeModal(id) {
    this.addOrEditEmployeeModal.show(id);
  }

  onEmployeeUpdated(emp: EmployeeListDto) {
    if(emp){
      this.employees.push(emp);
      this.getEmployees();
    }
    else{
      this.getEmployees();
    }
    this.notify.success(this.l("Saved Successully"));
  }

 
  getEmployees() {
    this.employesService.getAll(this.filterText).subscribe(
      result => { this.employees = result.items }
    );
  }

  // Del(id): void {
  //   this.message.confirm(
  //     " You Want To Delete This Employee",
  //     (isConfirmed) => {
  //       if (isConfirmed) {
  //         this.employesService.del(id).subscribe(
  //           result => {
  //             var index = this.employees.findIndex(x => x.id == result);
  //             this.employees.splice(index, 1);
  //           }
  //         );
  //       }
  //     }
  //   );
  // }


 Del(){
   if(this.selectedEmpls.length==0){
     this.message.warn("No select");
   }else{
     this.message.confirm(
       "Delete Employee",
       (isConfirmed)=>{
         if(isConfirmed){
           for(var i=0;i<this.selectedEmpls.length;i++){
             this.employesService.del(this.selectedEmpls[i].id).subscribe(()=>{
               this.getEmployees();
               this.notify.success(this.l('SuccessfullyDeleted'));
               this.selectedEmpls=[];
             })
           }
         }
       }
     )
   }
 }
}
