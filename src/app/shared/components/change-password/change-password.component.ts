import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { matchPasswordValidator } from '../../confirm-password-validator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  hideOld = true;
  hideNew = true;
  hideConfirm = true;
  isLoading = false;

  changePassForm!: FormGroup;

  ngOnInit(): void {
    this.onChange();
  }
  onChange() {
    this.changePassForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/),
          ],
        ],
        confirmNewPassword: ['', Validators.required],
      },
      {
        validators: matchPasswordValidator('newPassword', 'confirmNewPassword'),
      },
    );
  }

  onSubmit() {
    if (this.changePassForm.invalid) {
      this.changePassForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.authService.onChangePassword(this.changePassForm.value).subscribe({
      next: (res) => {
        console.log(res.message);
        this.toastrService.success(res.message, 'Success');
        this.changePassForm.reset();
        this.isLoading = false;
      },
      error: (err) => {
        this.toastrService.error(err.error?.message, 'Error!', {
          timeOut: 5000,
        });
        this.isLoading = false;
      },
    });
  }
}
