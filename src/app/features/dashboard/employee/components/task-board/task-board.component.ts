import { StatusEnum } from './../../../../../core/enums/general.enum';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { IResponse, ITask } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  private _EmployeeService = inject(EmployeeService);
  status = StatusEnum;

  tasksToDo: ITask[] = [];
  tasksInprogress: ITask[] = [];
  tasksDone: ITask[] = [];
  taskId!: number;

  isLoading: boolean = false;
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  ngOnInit(): void {
    this.fetchToDoTasks();
    this.fetchInProgressTasks();
    this.fetchDoneTasks();
  }
  fetchToDoTasks() {
    this.isLoading = true;
    this._EmployeeService
      .getTasksByStatus(this.status.ToDo, 1000, 1)
      .subscribe({
        next: (res: IResponse<ITask>) => {
          this.tasksToDo = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }
  fetchInProgressTasks() {
    this.isLoading = true;
    this._EmployeeService
      .getTasksByStatus(this.status.InProgress, 1000, 1)
      .subscribe({
        next: (res: IResponse<ITask>) => {
          this.tasksInprogress = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }
  fetchDoneTasks() {
    this.isLoading = true;
    this._EmployeeService
      .getTasksByStatus(this.status.Done, 1000, 1)
      .subscribe({
        next: (res: IResponse<ITask>) => {
          this.tasksDone = res.data;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          console.log('err', err);
        },
      });
  }
  drop(event: CdkDragDrop<ITask[]>) {
    const task = event.item.data as ITask;
    const taskId = task.id;
    console.log(taskId);
    console.log(event.container);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      return;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const newStatus = event.container.id as StatusEnum;
      this._EmployeeService.changeTaskStatus(taskId, newStatus).subscribe({
        next: (res: IResponse<ITask>) => {
          console.log('status changed succ');
        },
        error: (err) => {
          console.log('err', err);
        },
      });
    }
  }
}
