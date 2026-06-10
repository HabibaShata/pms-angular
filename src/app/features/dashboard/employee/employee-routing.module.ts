import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'tasks', component: TaskBoardComponent },
  { path: 'projects', component: ProjectsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
