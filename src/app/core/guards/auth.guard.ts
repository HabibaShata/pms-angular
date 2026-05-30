import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('PMSToken');
  if (token) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
