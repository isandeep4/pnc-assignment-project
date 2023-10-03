import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, map } from 'rxjs';

export interface User {
  name: String;
  email: String;
  img: String;
  bio: String;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{

  userDetails?:User;
  displayImage:any;
  private loading: boolean = false;


  constructor(private authService: AuthService, private router: Router){
  }

  ngOnInit(): void {
    this.setLoading(true);
    this.authService.getUserDetails().subscribe((response: User)=>{
      this.userDetails = response;        
      this.setLoading(false);
    });
  }
  onLogOut() {
    this.router.navigate(['/']);
    // set the authenticatedUser to false only when log out button clicked
    this.authService.setAuthenticated(false);
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
