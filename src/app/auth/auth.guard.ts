import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, lastValueFrom, map, of, switchMap, take, takeLast } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(private authService: AuthService,
    private router: Router) { } 

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Promise<boolean> {
        return new Promise<boolean>((resolve) => {
          this.authService.isAuthenticatedSubject().subscribe((isAuthenticated: boolean) => {
            if (isAuthenticated) {
              // User is authenticated, allow access to the protected route
              resolve(true);
            } else {
              // User is not authenticated, redirect to the login page
              this.router.navigate(['/']);
              resolve(false);
            }
          });
        });
      }
  }