import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

<<<<<<< Updated upstream
const routes: Routes = [{ path: '', component: DashboardComponent }];
=======
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path:'',
        redirectTo: 'employee',
        pathMatch: 'full'
      },
      { path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
    ],
  },
  {
    path: 'profile/change-password',
    component: ChangePasswordComponent,
    title: 'Change Password',
  },

];
>>>>>>> Stashed changes

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
