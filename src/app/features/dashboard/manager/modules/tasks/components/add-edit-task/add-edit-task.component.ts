import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ITaskPayload, ITask } from '../../../../interfaces/manger.interface';
import { ManagerService } from '../../../../services/manager.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss'],
})
export class AddEditTaskComponent implements OnInit {
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly managerService = inject(ManagerService);
  private readonly activatedRoute = inject(ActivatedRoute);

  tasksForm!: FormGroup;
  usersList: any[] = [];
  projectsList: any[] = [];
  taskData!: ITask;
  taskId: number = 0;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.tasksForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      employeeId: [null, Validators.required],
      projectId: [null, Validators.required],
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.taskId = Number(id);
    if (this.taskId) {
      this.getTaskDetails(this.taskId);
    }
    this.getUsers();
    this.getProjects();
  }

  onSubmit(): void {
    if (this.tasksForm.invalid) {
      this.tasksForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const formValues = this.tasksForm.getRawValue();
    const sendData = {
      title: formValues.title,
      description: formValues.description,
      employeeId: formValues.employeeId,
      projectId: formValues.projectId,
    };

    if (this.taskId) {
      this.updateTask(sendData);
    } else {
      this.createTask(sendData);
    }
  }

  //Add task
  createTask(taskData: ITaskPayload) {
    this.managerService.createTask(taskData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(
          'Your Task was Added successfully',
          'success!',
        );
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.message, 'Error!');
      },
      complete: () => {
        this.router.navigate(['/dashboard/manager/tasks']);
      },
    });
  }
  //get task id
  getTaskDetails(id: number) {
    this.managerService.getTaskById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.taskData = res;
        this.tasksForm.patchValue({
          title: this.taskData.title,
          description: this.taskData.description,
          employeeId: this.taskData.employee?.id,
          projectId: this.taskData.project?.id,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //Edit Project
  updateTask(taskData: ITaskPayload) {
    this.managerService.updateTask(this.taskId, taskData).subscribe({
      next: (res) => {
        this.toastrService.success(
          'The task was updated successfully',
          'Success!',
        );
      },
      error: (err) => {
        this.toastrService.error(
          err.error?.message || 'Error occurred',
          'Error!',
        );
      },
      complete: () => {
        this.router.navigate(['/dashboard/manager/tasks']);
      },
    });
  }

  getUsers() {
    this.managerService.getUsersList(1, 100).subscribe({
      next: (res) => {
        this.usersList = res.data;
        console.log(this.usersList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getProjects() {
    this.managerService.getProjectList(1, 100).subscribe({
      next: (res) => {
        this.projectsList = res.data;
      },
    });
  }
}
