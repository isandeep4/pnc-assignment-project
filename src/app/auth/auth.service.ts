import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom, lastValueFrom, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerApiUrl = 'https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d';
  getUserApiUrl = 'https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2';
  authenticatedUser = false;
   _isAuthenticated = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  registerUser(){
    this.authenticatedUser = true;
    this.http.get(this.registerApiUrl).subscribe((response:any) => {
      if(response.success){
        this.authenticatedUser = true;
        // this._isAuthenticated.next(true)
      } else {
        this.authenticatedUser = false;
      }
      return  this.authenticatedUser;
    });
  }
  isAuthenticated() {
    return this.authenticatedUser;
  }
  getUserDetails(){
    return this.http.get(this.getUserApiUrl);
  }
}
