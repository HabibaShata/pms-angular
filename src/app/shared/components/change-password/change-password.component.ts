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

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);

  hideOld = true;
  hideNew = true;
  hideConfirm = true;
  isLoading = false;
  errorMessage = '';

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
        validators: this.passwordMatch,
      },
    );
  }

  passwordMatch(g: AbstractControl) {
    const newPassword = g.get('newPassword')?.value;
    const confirmNewPassword = g.get('confirmNewPassword')?.value;

    return newPassword === confirmNewPassword
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.changePassForm.invalid) {
      this.changePassForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.authService.onChangePassword(this.changePassForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('Password has been changed successfully!');
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error?.Message;
        this.isLoading = false;
      },
    });
  }
}
