import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },

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
export class DashboardRoutingModule {}
