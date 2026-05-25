import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
//import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';

const routes: Routes = [
  { path: '',
    component: AuthComponent,
    title:'Auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
     // { path: 'forgot-password', component: ForgotPassComponent },
      { path: 'verify-account', component: VerifyAccountComponent },
      { path: 'reset-password', component: ResetPassComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
