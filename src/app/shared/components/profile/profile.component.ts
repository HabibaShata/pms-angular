import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICurrentUser } from 'src/app/features/auth/interfaces/auth';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { FileUtilServiceService } from '../../services/file-util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private formSub = new Subscription();
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)
  private readonly fileUtilService = inject(FileUtilServiceService);
  profileForm!: FormGroup;
  imageLink!: string
  assetUrl = environment.assetUrl;
  loadingData: boolean = false
  currentUser!: ICurrentUser;
  showConfirmPassword = false;
  imagePreview: string | null = null;
  selectedImage!: File;
  isLoading: boolean = false;

  constructor() { this.initForm(); }

  //Life Cycle Hooks
  ngOnInit(): void {
    this.getUserData()
  }

  // Form Function
  initForm(): void {
    this.profileForm = this.fb.group(
      {
        userName: [null, [Validators.required, Validators.maxLength(8), Validators.pattern(/^[A-Za-z]+[0-9]+$/)]],
        country: [null, Validators.required],
        phoneNumber: [null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
        email: [null, [Validators.required, Validators.email]],
        profileImage: [null],
        confirmPassword: [null, [Validators.required]],
      }
    );
  }

  //API Functions
  getUserData() {
    this.loadingData = true
    this.authService.getCurrentUserData().subscribe({
      next: (res: ICurrentUser) => {
        this.loadingData = false
        this.currentUser = res;
        this.profileForm.patchValue({
          userName: res.userName,
          email: res.email,
          country: res.country,
          phoneNumber: res.phoneNumber,
          profileImage: res.imagePath
        })
        this.imagePreview = this.assetUrl + res.imagePath;
        this.imageLink = res.imagePath || ''
      },
      error: () => {
        this.loadingData = false
        this.toastr.error("Error in Fetching User Data", '!Error')
      },
      complete: () => {
        this.loadingData = false
      }
    })
  }

  async onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { profileImage, ...rest } = this.profileForm.value;

    const formData = new FormData();
    Object.entries({
      ...rest,
      profileImage: profileImage
    }).forEach(([key, val]) => formData.append(key, val as string));

    //formData.forEach((value, key) => console.log(key, value));
    if (this.imageLink && !profileImage) {
      // Convert existing image url to File
      const file = await this.fileUtilService.imageUrlToFile(this.assetUrl + this.imageLink, 'existing-image.png');
      formData.append('profileImage', file);
    }

    this.formSub = this.authService.updateCurrentUserData(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error!');
        this.isLoading = false;
      },
      complete: () => {
        this.toastr.success("Your Profile updated Successfully", 'Success!');
        window.location.reload();
      }
    });
  }

  // Helper Functions
  onImageSelected(file: File): void {
    this.selectedImage = file;
    this.profileForm.patchValue({
      profileImage: file,
    });
    this.profileForm.get('profileImage')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onImageRemoved(): void {
    this.selectedImage = null as any;
    this.imagePreview = null;
    this.profileForm.patchValue({
      profileImage: null,
    });
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe()
  }
}
