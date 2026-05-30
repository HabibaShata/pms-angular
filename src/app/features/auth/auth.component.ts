import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  private formSub = new Subscription();
  private readonly fb = inject(FormBuilder);
  private readonly authservice = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  loginForm!: FormGroup;
  hide = true;
  // Variables
  errorMessage: string = '';
  isLoading: boolean = false;

  // Constructor
  constructor() {
    this.formInit();
  }

  // Life Cycle Hooks
  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }

  // Forms Functions
  formInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#?&]{8,}$/,
          ),
        ],
      ],
    });
  }
  // API Functions
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.isLoading = false;
      return;
    }
    // start loader
    this.isLoading = true;

    this.formSub = this.authservice.onLogin(this.loginForm.value).subscribe({
      next: (res) => {
        this.errorMessage = '';
        localStorage.setItem('PMSToken', res.token);
        this.authservice.getProfile();
        this.toastr.success(
          'You have been logged in successfully!',
          'Success!',
        );
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong';
        this.toastr.error(err.error.message, 'Error!');
        this.isLoading = false;
      },
      complete: () => {
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
    });
  }

  // Helper Functions
  // getControl(controlName: string): FormControl {
  //   return this.loginForm.get(controlName) as FormControl
  // }
}
