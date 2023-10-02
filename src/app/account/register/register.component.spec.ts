import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  const authService = {
    savedForm: {
      username: "isandeep",
      email: "test@gmail.com",
      password: "Sandy@12345",
      dob: '12-12-2023',
      gender: 'Male',
    }, 
    registerUser(){
      return of(false);
    }
  }
  let authServiceStub:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, MatToolbarModule, 
        MatFormFieldModule, MatIconModule, MatCardModule, MatDatepickerModule, 
        MatNativeDateModule, MatRadioModule, MatInputModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authService  }
      ],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    authServiceStub = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', ()=>{
    expect(component.registerForm.valid).toBeFalsy();
  });
  it('email field validity', ()=>{
    let email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors:any = {};
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("test");
    errors = email.errors;
    expect(errors['pattern']).toBeTruthy();
  })
  it('submit a form will store the value', () => {
    const mySpy = spyOn(authServiceStub , 'registerUser');
    const navigateSpy = spyOn(router, 'navigate');
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls['email'].setValue("test@gmail.com");
    component.registerForm.controls['userName'].setValue("isandeep");
    component.registerForm.controls['password'].setValue("Sandy@12345");
    component.registerForm.controls['dob'].setValue('12-12-2023');
    component.registerForm.controls['gender'].setValue('Male');
    component.onSubmit(component.registerForm);

    expect(mySpy).toHaveBeenCalledTimes(1);
    expect(authServiceStub.savedForm.username).toBe(component.registerForm.get('userName')?.getRawValue());
  })

  it('should navigate', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onSubmit(component.registerForm);
    expect(navigateSpy).toHaveBeenCalledWith(['profile']);
});
});
