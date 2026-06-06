import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { A11yModule } from "@angular/cdk/a11y";
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';


@NgModule({
  declarations: [
    ManagerComponent,
    ProjectListComponent,
    ProjectViewComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ManagerRoutingModule,
    A11yModule
]
})
export class ManagerModule { }
