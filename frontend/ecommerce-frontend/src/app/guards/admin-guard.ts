import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuardGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(Auth);

  if (auth.isAdmin()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
