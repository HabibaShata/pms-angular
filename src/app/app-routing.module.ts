import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';

const routes: Routes = [
   {path:'',redirectTo:'auth',pathMatch:'full'},
   { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
   { path: '**', component: NotFoundPageComponent ,title:'Not Found'}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
