
import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Injecta el Router para redirigir
  const user = localStorage.getItem('user');

  if (user) {
    // Si el usuario existe en localStorage, permitir el acceso a la ruta
    return true;
  } else {
    // Si no existe, redirigir al login
    router.navigate(['/login']);
    return false;
  }
};
