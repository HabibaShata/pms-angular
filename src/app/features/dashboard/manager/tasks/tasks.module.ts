import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';

@NgModule({
  declarations: [TasksComponent, TaskDetailComponent, AddEditTaskComponent],
  imports: [SharedModule, CommonModule, TasksRoutingModule],
})
export class TasksModule {}
