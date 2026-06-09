import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectDetailComponent],
  imports: [SharedModule, CommonModule, ProjectsRoutingModule,MatDialogModule],
})
export class ProjectsModule {}
