import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  
  constructor(private authService: AuthService,
    private router: Router) { } 

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
          if (this.authService.authenticatedUser) {
              return of(true);
          }
          this.router.navigate(['/']);
          return of(false);

  }

  }