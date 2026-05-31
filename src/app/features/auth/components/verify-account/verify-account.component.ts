import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  hide: boolean = true;
  isLoading: boolean = false;
  errorMessage: string = '';

  verifyAccForm!: FormGroup;

  constructor() {
    this.createVerifyAcc();

    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      this.verifyAccForm.patchValue({
        email: savedEmail,
      });
    }
  }

  createVerifyAcc() {
    this.verifyAccForm = this.fb.group({
      email: new FormControl(
        { value: localStorage.getItem('email'), disabled: true },
        [Validators.required, Validators.email],
      ),
      code: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.verifyAccForm.invalid) {
      this.verifyAccForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService
      .onVerifyAccount(this.verifyAccForm.getRawValue())
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastrService.success(
            res.message || 'Your email is verified',
            'Success',
            {
              timeOut: 5000,
            },
          );
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);

          this.toastrService.error(
            err.error?.message || 'Your email is not verified',
            'Error!',
            {
              timeOut: 5000,
            },
          );
          this.isLoading = false;
        },
        complete: () => {
          this.router.navigate(['/auth/login']);
        },
      });
  }
}
