import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators,FormGroupDirective, FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private _fb:FormBuilder, private authService: AuthService, private router: Router){}
  registerForm: FormGroup = this._fb.group({
      userName: '',
      email: '',
      password: '',
      dob: '',
      gender: '',
  });
  fieldRequired: string = "This field is required";

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerForm = new FormGroup({
      'userName': new FormControl(null,[Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
      'password': new FormControl(null, [Validators.required, this.checkPassword]),
      'dob': new FormControl(null, [Validators.required]),
      'gender': new FormControl(null, [Validators.required]),
    })
  }
  emaiErrors() {
    return this.registerForm.get('email')!.hasError('required') ? 'This field is required' :
      this.registerForm.get('email')!.hasError('pattern') ? 'Not a valid emailaddress' :''
  }
  checkPassword(control:any){
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.registerForm.get('password')!.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.registerForm.get('password')!.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  checkValidation(input: string){
    const validation = this.registerForm.get(input)!.invalid && (this.registerForm.get(input)!.dirty || this.registerForm.get(input)!.touched);
    return validation;
  }
  onSubmit(registerForm:FormGroup, formDirective:FormGroupDirective): void {
    const username = registerForm.get('userName');
    const email = registerForm.get('email');
    const password = registerForm.get('password');
    const dob = registerForm.get('dob');
    const gender = registerForm.get('gender');

    // we can call the post API passing payload this registraion form values and save in DB. 
    // for now we are not writing saving to DB logic since we have only get API.
    this.authService.registerUser();
    this.router.navigate(['profile']);
    
  }

}
