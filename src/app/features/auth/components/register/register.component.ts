import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { matchPasswordValidator } from 'src/app/shared/confirm-password-validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  private formSub = new Subscription();
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  registerForm!: FormGroup;

  isLoading = false;
  errorMessage = '';
  hidePassword = true;
  hideConfirmPassword = true;

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile!: File;

  constructor() {
    this.RegisterformInit();
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  RegisterformInit(): void {
    this.registerForm = this.fb.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.maxLength(8),
            Validators.pattern(/^(?=.*[A-Za-z])[A-Za-z]+[0-9]+$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        country: ['', Validators.required],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{11}$/)],
        ],
        profileImage: [null],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: matchPasswordValidator('password', 'confirmPassword') },
    );
  }

  // handle file input
  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('userName', this.registerForm.value.userName);
    formData.append('email', this.registerForm.value.email);
    formData.append('country', this.registerForm.value.country);
    formData.append('phoneNumber', this.registerForm.value.phoneNumber);
    formData.append('password', this.registerForm.value.password);
    formData.append('confirmPassword', this.registerForm.value.confirmPassword);

    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    this.isLoading = true;

    this.formSub = this.authService.onRegister(formData).subscribe({
      next: (res) => {
        this.toastr.success('Account created successfully', 'Success');
        localStorage.setItem('email', this.registerForm.value.email);
        this.router.navigate(['/auth/verify-account']);
      },
      error: (error) => {
        this.toastr.error(
          error.error?.message || 'An error occurred. Please try again.',
          'Error',
        );
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
