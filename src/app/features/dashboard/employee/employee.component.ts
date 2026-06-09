import { GeneralService } from './../../../shared/services/general.service';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ITasksCount } from 'src/app/shared/Interfaces/general';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
    private readonly generalService = inject(GeneralService);
    private readonly toastr = inject(ToastrService);
    tasksCount!: ITasksCount;
    tasksSeries: number[] = [];
    isLoading: boolean = false;

    ngOnInit(): void {
      this.getTasksCount();
    }

    getTasksCount() {
      this.isLoading = true;
      this.generalService.getTasksCount().subscribe({
        next: (res) => {
          this.tasksCount = res;
          this.tasksSeries = [ res.inProgress, res.toDo, res.done ]
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error('Failed to load tasks count', 'Error');
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
}
