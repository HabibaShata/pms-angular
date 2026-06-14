import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { matchPasswordValidator } from 'src/app/shared/confirm-password-validator';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})
export class AddManagerComponent {
  private formSub = new Subscription();
  private readonly fb = inject(FormBuilder)
  private readonly usersService = inject(UsersService)
  private readonly toastr = inject(ToastrService)
  private readonly router = inject(Router)
  createManagerForm!: FormGroup
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true
  isLoading: boolean = false;
  imagePreview: string | null = null;

  constructor() {
    this.formInit();
  }

  // Forms Functions
  formInit(): void {
    this.createManagerForm = this.fb.group({
      userName: [null, [Validators.required, Validators.maxLength(8), Validators.pattern(/^[A-Za-z]+[0-9]+$/)]],
      country: [null, Validators.required],
      phoneNumber: [null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
      email: [null, [Validators.required, Validators.email]],
      profileImage: [null],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#?&]{8,}$/)]],
      confirmPassword: [null],
    }, {
      validators: matchPasswordValidator('password', 'confirmPassword')
    })
  }


  // API Functions
  createManger(): void {
    if (this.createManagerForm.invalid) {
      this.createManagerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    let result: string = '';
    const { profileImage, ...rest } = this.createManagerForm.value;

    const formData = new FormData();
    Object.entries({
      ...rest,
      profileImage: profileImage
    }).forEach(([key, val]) => formData.append(key, val as string));

    formData.forEach((value, key) => console.log(key, value));

    this.formSub = this.usersService.AddManager(formData).subscribe({
      next: (res) => {
        this.toastr.success("Your Account Created Successfully", 'Success!');
        this.router.navigate(['/dashboard/manager/users']);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error!');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
  // Helper Functions
  onImageSelected(file: File): void {
  //this.selectedImage = file;

  this.createManagerForm.patchValue({
    profileImage: file,
  });

  this.createManagerForm.get('profileImage')?.updateValueAndValidity();

  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };

  reader.readAsDataURL(file);
}

onImageRemoved(): void {
 // this.selectedImage = null;
  this.imagePreview = null;

  this.createManagerForm.get('profileImage')?.reset();
  this.createManagerForm.get('profileImage')?.updateValueAndValidity();
}

}
