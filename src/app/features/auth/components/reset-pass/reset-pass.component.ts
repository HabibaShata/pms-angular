import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _toastr = inject(ToastrService);
  private readonly _router = inject(Router);
  resetPassForm!: FormGroup;
  isLoading: boolean = false;
  hide: boolean = true;
  confirmHide: boolean = true;
  errorMessage: string = '';
  userEmail: string | null = localStorage.getItem('userEmail');

  ngOnInit(): void {
    this.resetPassForm = this.fb.group(
      {
        email: [this.userEmail, [Validators.required, Validators.email]],
        password: [
          ,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            ),
          ],
        ],
        confirmPassword: [, [Validators.required]],
        seed: [
          ,
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{4,}$/)],
        ],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  onResetPass() {
    if (this.resetPassForm.invalid) {
      this.resetPassForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    console.log(this.resetPassForm.value);
    this._AuthService.onResetPass(this.resetPassForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.errorMessage = '';
        this._toastr.success(
          response.message || 'Password reset successfully.',
          'Success',
        );
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'An error occurred. Please try again.';
        this._toastr.error(this.errorMessage);
      },
      complete: () => {
        localStorage.removeItem('userEmail');
        this._router.navigate(['/auth/login']);
      },
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    console.log('Validating password match...', control);
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Skip validation if controls are missing or confirmPassword hasn't been filled yet
    if (!password || !confirmPassword || !confirmPassword.value) {
      return null;
    }

    // If they don't match, set the error on the confirmation control
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // If they match, clear the mismatch error if it was previously set
      if (confirmPassword.hasError('passwordMismatch')) {
        const errors = confirmPassword.errors;
        delete errors?.['passwordMismatch'];
        confirmPassword.setErrors(
          errors && Object.keys(errors).length > 0 ? errors : null,
        );
      }
    }

    return null;
  }
}
