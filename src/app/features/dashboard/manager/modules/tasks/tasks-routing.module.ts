import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'add', component: AddEditTaskComponent },
  { path: 'edit/:id', component: AddEditTaskComponent },
  { path: 'task-detail', component: TaskDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
