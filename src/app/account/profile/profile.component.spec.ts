import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;

  let mockAuthService = {
    authenticatedUser:false,
    getUserDetails: (): any => {return { subscribe: () => {} }},
    setAuthenticated: (): any => { }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule],
      declarations: [ProfileComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService  }
      ],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get user details on ngOnInit', () => {
    const mySpy = spyOn(mockAuthService , 'getUserDetails').and.returnValue(of({
      name: 'sandeep',
      email: 'sandeep@gmail.com',
      img: 'url',
      bio: 'bio',
    }))
    component.ngOnInit();
    expect(mySpy).toHaveBeenCalledTimes(1);
  });
  it('should redirect to home page on logout', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const setAuthenticatedSpy = spyOn(mockAuthService, 'setAuthenticated');
    component.onLogOut();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  })
});
