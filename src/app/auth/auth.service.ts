import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom, lastValueFrom, of, switchMap, tap } from 'rxjs';
import { User } from '../account/profile/profile.component';
import { UserForm } from '../account/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerApiUrl = 'https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d';
  getUserApiUrl = 'https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2';
  authenticatedUser = false;
  _isAuthenticated = new BehaviorSubject(false);
  savedForm!: UserForm;

  constructor(private http: HttpClient) { }

  registerUser(form: UserForm){
    this.savedForm = form;
    this.authenticatedUser = true;
    this.http.get(this.registerApiUrl).subscribe((response:any) => {
      if(response.success){
        this.authenticatedUser = true;
        // this._isAuthenticated.next(true)
      } else {
        this.authenticatedUser = false;
      }
    });
  }
  isAuthenticated() {
    return this.authenticatedUser;
  }
  getUserDetails(): Observable<User> {
    return this.http.get<User>(this.getUserApiUrl);
  }
}
