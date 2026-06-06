import { AuthService } from 'src/app/features/auth/services/auth.service';
import { CanActivateFn } from '@angular/router';
import { RoleEnum } from '../enums/general.enum';
import { inject } from '@angular/core';

export const managerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userRole = authService.getRole();

  if (userRole == RoleEnum.Manager) {
    return true;
  }

  return false;
};
