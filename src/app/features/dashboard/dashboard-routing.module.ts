import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';
import { managerGuard } from 'src/app/core/guards/manager.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'manager',
        pathMatch: 'full'
      },
      { path: 'manager',
        canActivate: [managerGuard],
        loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
