import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (parseInt(localStorage.getItem('Id') ?? '0', 10) != 0) {
    return true;
  } else {
    window.location.href = 'login';
    return false;
  }
};
