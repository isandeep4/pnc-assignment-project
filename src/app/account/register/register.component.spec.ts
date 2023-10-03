import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import {
  emailPatternMsg,
  emailRequiredMsg,
  passwordRequiredMsg,
  passwordRequirementMsg,
} from 'src/app/constants';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let authServiceStub: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [RegisterComponent],
      providers: [AuthService],
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
  it('form invalid when empty', () => {
    expect(component.userRegistrationForm.valid).toBeFalsy();
  });
  it('email field validity', () => {
    let email = component.userRegistrationForm.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors: any = {};
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue('test');
    errors = email.errors;
    expect(errors['pattern']).toBeTruthy();
  });
  it('submit a form will call register service', () => {
    const mySpy = spyOn(authServiceStub, 'registerUser').and.returnValue(
      of({ success: true })
    );
    const navigateSpy = spyOn(router, 'navigate');
    expect(component.userRegistrationForm.valid).toBeFalsy();
    component.onSubmit(component.userRegistrationForm);
    expect(mySpy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to profile if the registration successful', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const registerUserSpy = spyOn(
      authServiceStub,
      'registerUser'
    ).and.returnValue(of({ success: true }));
    const setAuthenticatedSpy = spyOn(authServiceStub, 'setAuthenticated');
    component.onSubmit(component.userRegistrationForm);
    expect(registerUserSpy).toHaveBeenCalled();
    expect(setAuthenticatedSpy).toHaveBeenCalledWith(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/profile']);
  });
  it('should handle registration error', () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(authServiceStub, 'registerUser').and.returnValue(
      of({ success: false })
    );
    component.onSubmit(component.userRegistrationForm);
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
  it('should return emailRequiredMsg when email field is empty', () => {
    const emailFormControl = component.userRegistrationForm.get('email');
    emailFormControl!.setValue('');
    expect(component.emaiErrors()).toEqual(emailRequiredMsg);
  });

  it('should return emailPatternMsg when email format is invalid', () => {
    const emailFormControl = component.userRegistrationForm.get('email');
    emailFormControl!.setValue('invalidemail');
    expect(component.emaiErrors()).toEqual(emailPatternMsg);
  });

  it('should return empty string when email format is valid', () => {
    const emailFormControl = component.userRegistrationForm.get('email');
    emailFormControl!.setValue('validemail@example.com');
    expect(component.emaiErrors()).toEqual('');
  });

  it('should return passwordRequiredMsg when password field is empty', () => {
    const passwordFormControl = component.userRegistrationForm.get('password');
    passwordFormControl!.setValue('');
    expect(component.getErrorPassword()).toEqual(passwordRequiredMsg);
  });

  it('should return passwordRequirementMsg when password does not meet requirements', () => {
    const passwordFormControl = component.userRegistrationForm.get('password');
    passwordFormControl!.setValue('weakpassword');
    expect(component.getErrorPassword()).toEqual(passwordRequirementMsg);
  });

  it('should return empty string when password meets requirements', () => {
    const passwordFormControl = component.userRegistrationForm.get('password');
    passwordFormControl!.setValue('StrongPassword123');
    expect(component.getErrorPassword()).toEqual('');
  });

  it('should return true for checkValidation when input is invalid and dirty or touched', () => {
    const inputName = 'email';
    const formControl = component.userRegistrationForm.get(inputName);
    formControl!.setValue('');
    formControl!.markAsDirty();
    expect(component.checkValidation(inputName)).toBeTruthy();
  });

  it('should return false for checkValidation when input is valid and not dirty or touched', () => {
    const inputName = 'email';
    const formControl = component.userRegistrationForm.get(inputName);
    formControl!.setValue('validemail@example.com');
    expect(component.checkValidation(inputName)).toBeFalsy();
  });
});
