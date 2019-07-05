import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                { path: 'employees', component:EmployeesComponent },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class EmployeeRoutingModule { }
