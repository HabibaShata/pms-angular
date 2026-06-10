import { Component, inject, OnInit } from '@angular/core';
import { IUserscount } from './interfaces/manger.interface';
import { ManagerService } from './services/manager.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { GeneralService } from 'src/app/shared/services/general.service';
import { ITasksCount } from 'src/app/shared/Interfaces/general';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  private readonly managerService = inject(ManagerService);
  private readonly generalService = inject(GeneralService);
  private readonly toastr = inject(ToastrService);
  usersCount!: IUserscount;
  tasksCount!: ITasksCount;
  usersSeries: number[] = [];
  tasksSeries: number[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;

    forkJoin({
      usersCount: this.managerService.getUsersCount(),
      tasksCount: this.generalService.getTasksCount(),
    }).subscribe({
      next: (res) => {
        this.usersCount = res.usersCount;
        this.usersSeries = [
          res.usersCount.activatedEmployeeCount,
          res.usersCount.deactivatedEmployeeCount,
        ];

        this.tasksCount = res.tasksCount;
        this.tasksSeries = [
          res.tasksCount.inProgress,
          res.tasksCount.toDo,
          res.tasksCount.done,
        ];
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to load dashboard data', 'Error');
        this.isLoading = false;
      },
    });
  }
}
