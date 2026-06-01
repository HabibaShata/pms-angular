import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
 collapsed = false;
  hovered = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
