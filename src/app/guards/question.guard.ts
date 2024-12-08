import { LocalStorageService } from '#services';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const questionGuard: CanActivateFn = () => {
  const localStorage = inject(LocalStorageService);
  const router = inject<Router>(Router);

  return true;
};
