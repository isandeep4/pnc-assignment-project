import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('authGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}};
  let mockAuthService = {
    isAuthenticated: (): any => {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: mockAuthService  }],
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    
  });

  it('should redirect to login', () => {
    const navigateSpy = spyOn(router, 'navigate');
    authService.authenticatedUser = false;
    guard.canActivate(routeMock, routeStateMock).subscribe();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
});
});
