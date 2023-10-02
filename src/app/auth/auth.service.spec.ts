import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return authenticated status', () => {
    expect(service.isAuthenticatedSubject()).toBe(new BehaviorSubject(false))
  });
  it('should return user details', () => {
    service.getUserDetails().subscribe((data)=>{
      expect(data).toEqual(mockData);
    })
  })
});
