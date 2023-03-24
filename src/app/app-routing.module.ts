import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';
import { AddEditEmployeeComponent } from './employee/add-edit-employee/add-edit-employee.component';
const routes: Routes = [
    { path: '', redirectTo:'employee/list', pathMatch:'full'  },
    { path: 'employee/add', component: AddEditEmployeeComponent },
    { path: 'employee/edit', component: AddEditEmployeeComponent },
    { path: 'employee/list', component: ViewEmployeeComponent  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
