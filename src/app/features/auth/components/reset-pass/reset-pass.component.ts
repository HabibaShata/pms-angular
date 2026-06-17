import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { matchPasswordValidator } from 'src/app/shared/confirm-password-validator';
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
      { validators: matchPasswordValidator('password', 'confirmPassword') },
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

        this._toastr.success(
          response.message || 'Password reset successfully.',
          'Success',
        );
      },
      error: (error) => {
        this.isLoading = false;

        this._toastr.error(
          error.error?.message || 'An error occurred. Please try again.',
          'Error',
        );
      },
      complete: () => {
        localStorage.removeItem('userEmail');
        this._router.navigate(['/auth/login']);
      },
    });
  }
}
