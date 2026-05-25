import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Login'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: 'forgot-password',
    component: ForgotPassComponent,
    title: 'Forgot Password'
  },
  {
    path: 'verify-account',
    component: VerifyAccountComponent,
    title: 'Verify Account'
  },
  {
    path: 'reset-password',
    component: ResetPassComponent,
    title: 'Reset Password'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
