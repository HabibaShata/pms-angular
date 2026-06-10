import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskBoardComponent } from './components/task-board/task-board.component';

@NgModule({
  declarations: [EmployeeComponent, TaskBoardComponent],
  imports: [CommonModule, SharedModule, EmployeeRoutingModule],
})
export class EmployeeModule {}
