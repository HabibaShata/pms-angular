import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent implements OnInit {
  isLoading: boolean = false;
  forgotPassForm!: FormGroup;
  userEmail: string | null = localStorage.getItem('userEmail');
  private readonly _authservice = inject(AuthService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  ngOnInit(): void {
    this.forgotPassForm = new FormGroup({
      email: new FormControl(this.userEmail, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onForgotPass() {
    if (this.forgotPassForm.invalid) {
      this.forgotPassForm.markAllAsTouched();
      return;
    }
    // start loader
    this.isLoading = true;

    // API call here
    this._authservice.onForgotPass(this.forgotPassForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;

        localStorage.setItem('userEmail', this.forgotPassForm.value.email);
        this._ToastrService.success(
          response.message ||
            'Password reset request successful. Please check your email.',
          'Success',
        );
      },
      error: (error) => {
        this.isLoading = false;
        this._ToastrService.error(
          error.error?.message || 'An error occurred. Please try again.',
          'Error',
        );
      },
      complete: () => {
        this.isLoading = false;
        this._Router.navigate(['/auth/reset-password']);
      },
    });
  }
}
