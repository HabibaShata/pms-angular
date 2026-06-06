import { Component, inject } from '@angular/core';
import { RoleEnum } from 'src/app/core/enums/general.enum';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

interface Menu {
  label: string,
  icon: string,
  routerNavigate: string,
  isActive: boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private readonly SidebarService = inject(SidebarService);
  private readonly authService = inject(AuthService);

  //Menu
  isManager(): boolean {
    return this.authService.getRole() === RoleEnum.Manager;
  }

  isEmployee(): boolean {
    return this.authService.getRole() === RoleEnum.Employee;
  }

  navMenu: Menu[] = [
    {
      label: 'Home',
      icon: 'fa fa-home',
      routerNavigate: this.isManager() ? '/dashboard/manager' : '/dashboard/employee',
      isActive: this.isManager() || this.isEmployee()
    },
    {
      label: 'Users',
      icon: 'fa-solid fa-users',
      routerNavigate: '/dashboard/manager/users',
      isActive: this.isManager()
    },
    {
      label: 'Projects',
      icon: 'fa-solid fa-diagram-project',
      routerNavigate: '/dashboard/manager/projects',
      isActive: this.isManager()
    },
    {
      label: 'Tasks',
      icon: 'fa-solid fa-list-check',
      routerNavigate: '/dashboard/manager/tasks',
      isActive: this.isManager()
    },
    {
      label: 'Projects',
      icon: 'fa-solid fa-diagram-project',
      routerNavigate: '/dashboard/employee/projects',
      isActive: this.isEmployee()
    },
    {
      label: 'Tasks',
      icon: 'fa-solid fa-list-check',
      routerNavigate: '/dashboard/employee/tasks',
      isActive: this.isEmployee()
    }
  ];
  //For Large Screens sidebar Collapsed State
  get isCollapsed() {
    return this.SidebarService.value;
  }

  toggleSidebar() {
    this.SidebarService.toggle();
  }

  //For Mobile Screens sidebar Toggle State
  get isMobileOpen() {
    return this.SidebarService.isMobileOpen;
  }

  onNavItemClick(): void {
    if (window.innerWidth <= 992) {
      this.SidebarService.closeMobile();
    }
  }

  toggleMobileSidebar() {
    this.SidebarService.toggleMobile();
  }
}
