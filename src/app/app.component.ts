import { Component, HostListener, } from '@angular/core';
import { SidebarService } from './core/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'pms-angular';
  constructor(private sidebarService: SidebarService) {
    this.sidebarService.setScreenWidth(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.sidebarService.setScreenWidth(event.target.innerWidth);
  }
}
