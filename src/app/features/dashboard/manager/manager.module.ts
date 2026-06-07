import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { A11yModule } from '@angular/cdk/a11y';
import { AddEditProjectsComponent } from './projects/components/add-edit-projects/add-edit-projects.component';

@NgModule({
  declarations: [ManagerComponent, AddEditProjectsComponent],
  imports: [SharedModule, CommonModule, ManagerRoutingModule, A11yModule],
})
export class ManagerModule {}
