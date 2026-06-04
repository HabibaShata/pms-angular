import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  private mobileOpenSubject = new BehaviorSubject<boolean>(false);
  private isMobileSubject = new BehaviorSubject<boolean>(false);

  isMobile$ = this.isMobileSubject.asObservable();
  isMobileOpen$ = this.mobileOpenSubject.asObservable();
  collapsed$ = this.collapsedSubject.asObservable();

  // ==================================================
  // Desktop Sidebar Controls
  // ==================================================
  toggle() {
    this.collapsedSubject.next(!this.collapsedSubject.value);
  }

  setCollapsed(value: boolean) {
    this.collapsedSubject.next(value);
  }

  get value() {
    return this.collapsedSubject.value;
  }

  // =====================
  // SCREEN CONTROL
  // =====================
  setScreenWidth(width: number) {
    const isMobile = width < 992;
    this.isMobileSubject.next(isMobile);

    // auto-close sidebar when switching to mobile
    if (!isMobile) {
      this.mobileOpenSubject.next(false);
    }
  }

  // ==================================================
  // Mobile Drawer Getters
  // ==================================================
  get isMobileOpen() {
    return this.mobileOpenSubject.value;
  }

  get isMobile() {
    return this.isMobileSubject.value;
  }

  // ==================================================
  // Mobile Drawer Actions
  // ==================================================
  toggleMobile() {
    if (!this.isMobile) return; // prevent on desktop
    this.mobileOpenSubject.next(!this.mobileOpenSubject.value);
  }

  closeMobile() {
    this.mobileOpenSubject.next(false);
  }
}
