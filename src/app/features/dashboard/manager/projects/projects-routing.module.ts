import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { AddEditProjectsComponent } from './components/add-edit-projects/add-edit-projects.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'add', component: AddEditProjectsComponent },
  { path: 'edit/:id', component: AddEditProjectsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
