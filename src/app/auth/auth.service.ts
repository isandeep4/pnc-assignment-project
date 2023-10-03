import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../account/profile/profile.component';
import { UserForm } from '../account/register/register.component';
import {
  authenticatedUserKey,
  getUserApiUrl,
  registerApiUrl,
} from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticatedUser = false;
  authenticated$ = new BehaviorSubject(false);
  savedForm!: UserForm;

  constructor(private http: HttpClient) {
    // Initialize the authentication status from local storage (if available)
    const storedStatus = localStorage.getItem(authenticatedUserKey);
    this.authenticatedUser = storedStatus === 'true';
    this.authenticated$.next(this.authenticatedUser);
  }

  registerUser(form: UserForm): Observable<any> {
    return this.http.get(registerApiUrl);
  }
  setAuthenticated(value: boolean) {
    this.authenticatedUser = value;
    this.authenticated$.next(value);
    // Store the authentication status in local storage
    localStorage.setItem(authenticatedUserKey, value.toString());
  }
  isAuthenticatedSubject(): BehaviorSubject<boolean> {
    return this.authenticated$;
  }
  getUserDetails(): Observable<User> {
    return this.http.get<User>(getUserApiUrl);
  }
}
