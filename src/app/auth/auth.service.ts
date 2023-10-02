import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../account/profile/profile.component';
import { UserForm } from '../account/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerApiUrl = 'https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d';
  getUserApiUrl = 'https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2';
  private authenticatedUserKey = 'authenticatedUser';
  authenticatedUser = false;
  authenticated$ = new BehaviorSubject(false);
  savedForm!: UserForm;

  constructor(private http: HttpClient) {
    // Initialize the authentication status from local storage (if available)
    const storedStatus = localStorage.getItem(this.authenticatedUserKey);
    this.authenticatedUser = storedStatus === 'true';
    this.authenticated$.next(this.authenticatedUser);
   }
  
  registerUser(form: UserForm): Observable<any>{
    return this.http.get(this.registerApiUrl);
  }
  setAuthenticated(value: boolean) {
    this.authenticatedUser = value;
    this.authenticated$.next(value);
    // Store the authentication status in local storage
    localStorage.setItem(this.authenticatedUserKey, value.toString());
  }
  isAuthenticatedSubject(): BehaviorSubject<boolean> {
    return this.authenticated$;
  }
  getUserDetails(): Observable<User> {
    return this.http.get<User>(this.getUserApiUrl);
  }
}
