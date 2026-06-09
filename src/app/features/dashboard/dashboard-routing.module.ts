import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';
import { managerGuard } from 'src/app/core/guards/manager.guard';
import { redirectGuard } from 'src/app/core/guards/redirect.guard';
import { ProfileComponent } from 'src/app/shared/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        canActivate: [redirectGuard],
        component: DashboardComponent,
      },
      {
        path: 'manager',
        canActivate: [managerGuard],
        loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
      },
    ],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    title: 'Change Password',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
