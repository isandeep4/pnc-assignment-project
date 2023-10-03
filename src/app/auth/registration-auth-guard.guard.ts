import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationAuthGuardGuard {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.authService
        .isAuthenticatedSubject()
        .subscribe((isAuthenticated: boolean) => {
          if (isAuthenticated) {
            // User is authenticated, allow access to the profile page
            this.router.navigate(['/profile']);
          } else {
            // User is not authenticated, redirect to the registration page
            resolve(true);
          }
        });
    });
  }
}
