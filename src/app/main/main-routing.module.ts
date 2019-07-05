import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { TasksComponent } from './tasks/tasks.component';
import {EmployeedetialComponent} from './employees/employeedetial/employeedetial.component';
import { TaskdetailComponent } from './tasks/taskdetail/taskdetail.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } },
                    { path: 'employees', component: EmployeesComponent},
                    { path: 'employees/:id', component:EmployeedetialComponent},
                    { path: 'tasks/:id', component:TaskdetailComponent},
                    { path: 'tasks', component: TasksComponent}
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
