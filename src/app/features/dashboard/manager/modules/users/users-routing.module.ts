import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddManagerComponent } from './add-manager/add-manager.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'add' , component: AddManagerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
