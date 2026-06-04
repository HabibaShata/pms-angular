import { Component, inject } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private readonly SidebarService = inject(SidebarService);

  get isSidebarCollapsed() {
    return this.SidebarService.value;
  }
  get isMobile() {
    return this.SidebarService.isMobile;
  }
}
