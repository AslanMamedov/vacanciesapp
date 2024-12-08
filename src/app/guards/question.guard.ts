import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '#services';
import { inject } from '@angular/core';
//-
export const questionGuard: CanActivateFn = () => {
  const localStorage = inject(LocalStorageService);
  const router = inject<Router>(Router);

  return true;
};
