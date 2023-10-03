import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';

describe('authGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {} };
  let mockAuthService = {
    isAuthenticatedSubject: () => new BehaviorSubject<boolean>(false),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    });
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });
  it('should allow access when isAuthenticated returns true', async () => {
    spyOn(authService, 'isAuthenticatedSubject').and.returnValue(
      new BehaviorSubject(true)
    );
    const canActivate = await authGuard.canActivate(routeMock, routeStateMock);
    expect(canActivate).toEqual(true);
  });
  it('should block access and navigate to register when isAuthenticated returns false', async () => {
    spyOn(authService, 'isAuthenticatedSubject').and.returnValue(
      new BehaviorSubject(false)
    );
    spyOn(router, 'navigate');
    const canActivate = await authGuard.canActivate(routeMock, routeStateMock);
    expect(canActivate).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
