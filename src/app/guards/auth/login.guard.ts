import { CanActivateFn, UrlTree } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  if (parseInt(localStorage.getItem('Id') ?? '0', 10) == 0) {
    return true;
  } else {
    window.location.href = '/';
    return false;
  }
};
