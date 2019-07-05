import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { AddOrEditEmployyeeModalComponent } from './employees/add-or-edit-employyee-modal/add-or-edit-employyee-modal.component';
import { RouterModule } from '@angular/router';
import { DataTableModule, PaginatorModule, CalendarModule } from 'primeng/primeng';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalModule, TabsModule, TooltipModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import CountoModule from 'angular2-counto';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { EmployeeRoutingModule } from './module-employee-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    TabsModule,
    DataTableModule,
    TooltipModule,
    AppCommonModule,
    UtilsModule,
    EasyPieChartModule,
    ReactiveFormsModule,
    PaginatorModule,
    BsDatepickerModule.forRoot(),
    EmployeeRoutingModule
  ],
  declarations: [
    EmployeesComponent,
    AddOrEditEmployyeeModalComponent,

  ],
  exports: [
    RouterModule,
    EmployeesComponent //Export để sử dụng được ở Module khác
  ]
})
export class ModuleEmployeeModule { }
