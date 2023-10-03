import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let mockData = {
    name: 'King Julien',
    email: 'kingj@email.com',
    img: 'https://tinyurl.com/2p9953zy',
    bio: 'Hi my name is King Julien and I like to move it move it.',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should send a GET request to register API', () => {
    const form = {
      username: 'sandeep',
      email: 'sandeep@example.com',
      password: 'Sandy12345',
      dob: '2000-01-01',
      gender: 'male'
    };

    service.registerUser(form).subscribe();
    const req = httpTestingController.expectOne(service.registerApiUrl);
    expect(req.request.method).toBe('GET');
  });
  it('should return authenticated status', () => {
    service.authenticated$.next(true);
    const isAuthenticated = service.isAuthenticatedSubject().value;
    expect(isAuthenticated).toEqual(true)
    
  });
  it('should return user details', () => {
    service.getUserDetails().subscribe((data)=>{
      expect(data).toEqual(mockData);
    })
  })
});
