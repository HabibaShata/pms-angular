import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: AuthComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'forgot-password',
    component: ForgotPassComponent,
    title: 'Forgot Password',
  },
  {
    path: 'verify-account',
    component: VerifyAccountComponent,
    title: 'Verify Account',
  },
  {
    path: 'reset-password',
    component: ResetPassComponent,
    title: 'Reset Password',
  },
  {
    path: 'verify-account',
    component: VerifyAccountComponent,
    title: 'Verify Account',
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
export class AuthRoutingModule {}
