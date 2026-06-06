import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManagerService } from '../../services/manager.service';
import { IProject, IProjectPayload } from '../../interfaces/manger.interface';

@Component({
  selector: 'app-add-edit-projects',
  templateUrl: './add-edit-projects.component.html',
  styleUrls: ['./add-edit-projects.component.scss'],
})
export class AddEditProjectsComponent implements OnInit {
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly managerService = inject(ManagerService);
  private readonly activatedRoute = inject(ActivatedRoute);

  projectForm!: FormGroup;

  projectData!: IProject;
  projectId: number = 0;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectId = Number(id);
    if (this.projectId) {
      this.getProjectDetails(this.projectId);
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const formValues = this.projectForm.getRawValue();
    const sendData: IProjectPayload = {
      title: formValues.title,
      description: formValues.description,
    };

    if (this.projectId) {
      this.updateProject(sendData);
    } else {
      this.createProject(sendData);
    }
  }

  //Add Prpject
  createProject(projectData: IProjectPayload) {
    this.managerService.createProject(projectData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(
          'Your Project was Added successfully',
          'success!',
        );
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.message, 'Error!');
      },
      complete: () => {
        this.router.navigate(['/dashboard/manager/projects']);
      },
    });
  }
  //get project id
  getProjectDetails(id: number) {
    this.managerService.getProjectById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.projectData = res;
        this.projectForm.patchValue({
          title: this.projectData.title,
          description: this.projectData.description,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //Edit Project
  updateProject(projectData: IProjectPayload) {
    this.managerService.updateproject(this.projectId, projectData).subscribe({
      next: (res) => {
        this.toastrService.success(
          'The project was updated successfully',
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
        this.router.navigate(['/dashboard/manager/projects']);
      },
    });
  }
}
