import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role === 'admin') {
    return true;
  }
  router.navigate(['/']);

  return false;
};
