import { CanActivateFn, Router } from '@angular/router';
import { RoleEnum } from '../enums/role.enum';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';

export const redirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getRole();

  console.log('Role:', role);

  //Already on the correct subroute — let it through
  if (state.url.includes('/dashboard/manager') || state.url.includes('/dashboard/employee')) {
    return true;
  }

  if (role === RoleEnum.Manager) {
    return router.createUrlTree(['/dashboard/manager']);
  }

  return router.createUrlTree(['/dashboard/employee']);
};
