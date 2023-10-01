import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe((response)=>{
      console.log('user details', response)
    })
  }
}
