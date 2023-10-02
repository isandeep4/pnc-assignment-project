import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  let mockAuthService = {
    getUserDetails: (): any => {return { subscribe: () => {} }}
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
  })
});
