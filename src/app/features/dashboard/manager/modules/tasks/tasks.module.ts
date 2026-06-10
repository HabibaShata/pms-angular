import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TasksComponent, AddEditTaskComponent],
  imports: [SharedModule, CommonModule, TasksRoutingModule, MatDialogModule],
})
export class TasksModule {}
