import { Component, inject } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private readonly SidebarService = inject(SidebarService);

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

  toggleMobileSidebar() {
    this.SidebarService.toggleMobile();
  }
}
