import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import {
  Subject,
  Subscriber,
  catchError,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {
  emailPatternMsg,
  emailRequiredMsg,
  emailregex,
  passwordCheck,
  passwordRequiredMsg,
  passwordRequirementMsg,
} from 'src/app/constants';

export interface UserForm {
  username: any;
  email: any;
  password: any;
  dob: any;
  gender: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userRegistrationForm: FormGroup;
  fieldRequired: string = 'This field is required';
  formValues!: UserForm;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userRegistrationForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(emailregex),
      ]), // validators.email is not recognizing pattern
      password: new FormControl(null, [
        Validators.required,
        this.checkPassword,
      ]),
      dob: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}
  emaiErrors() {
    console.log;
    return this.userRegistrationForm.get('email')!.hasError('required')
      ? emailRequiredMsg
      : this.userRegistrationForm.get('email')!.hasError('pattern')
      ? emailPatternMsg
      : '';
  }
  checkPassword(control: any) {
    let enteredPassword = control.value;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }
  getErrorPassword() {
    return this.userRegistrationForm.get('password')!.hasError('required')
      ? passwordRequiredMsg
      : this.userRegistrationForm.get('password')!.hasError('requirements')
      ? passwordRequirementMsg
      : '';
  }
  checkValidation(input: string) {
    const validation =
      this.userRegistrationForm.get(input)!.invalid &&
      (this.userRegistrationForm.get(input)!.dirty ||
        this.userRegistrationForm.get(input)!.touched);
    return validation;
  }
  onSubmit(registerForm: FormGroup): void {
    const username = registerForm.get('userName');
    const email = registerForm.get('email');
    const password = registerForm.get('password');
    const dob = registerForm.get('dob');
    const gender = registerForm.get('gender');

    this.formValues = { username, email, password, dob, gender };

    // call the post API here passing form values. In this case it's a get API to check the user successfully registers
    this.authService
      .registerUser(this.formValues)
      .pipe(
        tap((response: any) => {
          // Assuming the registration API returns a success response
          if (response.success) {
            // Registration was successful, set authentication to true
            this.authService.setAuthenticated(true);
            // Redirect to the profile page
            this.router.navigate(['/profile']);
          } else {
            // Handle registration error
            this.router.navigate(['/']);
          }
        }),
        takeUntil(this.ngUnsubscribe),
        catchError((error: any) => {
          return throwError(() => error);
        })
      )
      .subscribe(); // Subscribe to start the observable
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
