import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RegistrationAuthGuardGuard } from './registration-auth-guard.guard';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistrationAuthGuardGuard', () => {
  let guard: RegistrationAuthGuardGuard;
  let authService: AuthService;
  let router: Router;
  let mockAuthService = {
    authenticatedUser: false,
    isAuthenticatedSubject: (): any => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        RegistrationAuthGuardGuard,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    guard = TestBed.inject(RegistrationAuthGuardGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when isAuthenticated returns false', async () => {
    // Mock the isAuthenticatedSubject to return false
    spyOn(authService, 'isAuthenticatedSubject').and.returnValue(
      new BehaviorSubject<boolean>(false)
    );

    const canActivate = await guard.canActivate(
      new ActivatedRouteSnapshot(),
      <RouterStateSnapshot>{}
    );

    expect(canActivate).toBe(true);
  });
});
