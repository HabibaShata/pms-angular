import { Component, inject, OnInit } from '@angular/core';
import { ITasksCount, IUserscount } from './interfaces/manger.interface';
import { ManagerService } from './services/manager.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  private readonly managerService = inject(ManagerService);
  private readonly toastr = inject(ToastrService);
  usersCount!: IUserscount;
  tasksCount!: ITasksCount;
  usersSeries: number[] = []
  tasksSeries: number[] = [];
  // isLoadingUsers:boolean = false;
  // isLoadingTasks:boolean = false;
  isLoading: boolean = false;
  
  ngOnInit(): void {
    // this.getUsersCount();
    // this.getTasksCount();
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;

    forkJoin({
      usersCount: this.managerService.getUsersCount(),
      tasksCount: this.managerService.getTasksCount()
    }).subscribe({
      next: (res) => {
        this.usersCount = res.usersCount;
        this.usersSeries = [res.usersCount.activatedEmployeeCount, res.usersCount.deactivatedEmployeeCount]

        this.tasksCount = res.tasksCount;
        this.tasksSeries = [ res.tasksCount.inProgress, res.tasksCount.toDo, res.tasksCount.done ]
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to load dashboard data', 'Error');
        this.isLoading = false;
      }
    });
  }
  // getUsersCount() {
  //   this.isLoadingUsers = true;
  //   this.managerService.getUsersCount().subscribe({
  //     next: (res) => {
  //       this.usersCount = res;
  //       this.usersSeries = [res.activatedEmployeeCount, res.deactivatedEmployeeCount]
  //     },
  //     error: (err) => {
  //       this.isLoadingUsers = false
  //       this.toastr.error('Failed to load users count', 'Error');
  //     },
  //     complete: () => {
  //       this.isLoadingUsers = false;
  //     }
  //   })
  // }

  // getTasksCount() {
  //   this.isLoadingTasks = true;
  //   this.managerService.getTasksCount().subscribe({
  //     next: (res) => {
  //       this.tasksCount = res;
  //       this.tasksSeries = [ res.inProgress, res.toDo, res.done ]
  //     },
  //     error: (err) => {
  //       this.isLoadingTasks = false;
  //       this.toastr.error('Failed to load tasks count', 'Error');
  //     },
  //     complete: () => {
  //       this.isLoadingTasks = false;
  //     }
  //   })
  // }
}
