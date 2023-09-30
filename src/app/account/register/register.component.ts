import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators,FormGroupDirective, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;

  constructor(private _fb: FormBuilder){

    this.registerForm = this._fb.group({
      fullName: '',
      email: '',
      password: '',
      dob: '',
      gender: '',
    })

  }

  ngOnInit(): void {
    
  }
  onSubmit(): void {

  }

}
