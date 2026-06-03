import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ICurrentUser } from 'src/app/features/auth/interfaces/auth';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private readonly router = inject(Router);

  assetUrl = environment.assetUrl;

  currentUser!: ICurrentUser;

  // get isSuperAdmin(): boolean {
  //   return this.authService.getRole() === roleEnum.SuperAdmin;
  // }

  //image Error
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '../../../../../assets/images/user-placeholder.png';
  }

  getUserData() {
    this.authService.getCurrentUserData().subscribe({
      next: (res: ICurrentUser) => {
        this.currentUser = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  //Search by name
  name: string = '';
  searchSubject: Subject<string> = new Subject();
  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }

  ngOnInit(): void {
    // this.searchSubject.pipe(debounceTime(500)).subscribe((value) => {
    //   console.log('search value:', value);

    //   const route = this.isSuperAdmin
    //     ? '/dashboard/admin/recipes'
    //     : '/dashboard/userPortal/user-recipes';
    //   console.log('route:', route);
    //   this.router.navigate([route], {
    //     queryParams: { name: value }
    //   });
    // });
    //get Current USer Data
    this.getUserData();
  }
}
