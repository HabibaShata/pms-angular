import { Component, inject, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { ICurrentUser } from 'src/app/features/auth/interfaces/auth';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private sidebarService = inject(SidebarService);
  assetUrl = environment.assetUrl;
  currentUser!: ICurrentUser;

  ngOnInit(): void {
    this.getUserData();
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

  // Returns current mobile screen status
  get isMobile() {
    return this.sidebarService.isMobile;
  }

  // Open/close mobile sidebar drawer
  toggleSidebar() {
    this.sidebarService.toggleMobile();
  }

  //image Error
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '../../../../../assets/images/user-placeholder.png';
  }
}
