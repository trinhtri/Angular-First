import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { MainRoutingModule } from './main-routing.module';
import { CountoModule } from '@node_modules/angular2-counto';
import { EasyPieChartModule } from 'ng2modules-easypiechart';

import { TaskServiceProxy, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { AddOrEditEmployyeeModalComponent } from './employees/add-or-edit-employyee-modal.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddOrEditModalComponent } from './tasks/add-or-edit-modal.component';
import { DataTableModule, PaginatorModule,Calendar, CalendarModule} from 'primeng/primeng';
import { DateTimeInputDirective } from './date-time-input.directive';
import { TaskdetailComponent } from './tasks/taskdetail/taskdetail.component';

import { BsDatepickerModule } from 'ngx-bootstrap';
import { DateRangeDirective } from './date-range.directive';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeedetialComponent } from './employees/employeedetial/employeedetial.component';
import { EmployeeModalComponent } from './tasks/employee-modal.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        MainRoutingModule,
        CountoModule,
        EasyPieChartModule,   
        DataTableModule,
        PaginatorModule,
        BsDatepickerModule.forRoot(),
        CalendarModule
    ],
    declarations: [
        DashboardComponent,
        AddOrEditEmployyeeModalComponent,
        TasksComponent,
        AddOrEditModalComponent,
        TaskdetailComponent,
        DateRangeDirective,
        EmployeesComponent,
        EmployeedetialComponent,
        EmployeeModalComponent,
        DateTimeInputDirective
    ],
    providers: [
        TaskServiceProxy ,
        EmployeeServiceProxy
    ]
})
export class MainModule { }
