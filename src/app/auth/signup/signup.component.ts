import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { misMatchPassword } from '../../core/Custom-validators/misMatchPassword';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userForm!: FormGroup

  constructor(private formBuilder : FormBuilder,private router : Router){
    // this.userForm = new FormGroup({
    //   firstName : new FormControl("",Validators.required),
    //   lastName : new FormControl("",[Validators.maxLength(5),Validators.required]),
    //   email  : new FormControl("",[Validators.required,Validators.email]),
    //   password : new FormControl("",[Validators.required,Validators.minLength(8)])
    // }, {validator :misMatchPassword})
  }
  ngOnInit(){
    this.userFormBuilder();
    console.log('Initial form valid:', this.userForm.valid);
    console.log('Initial form value:', this.userForm.value);

    // Subscribe to form value changes and log the form validity and errors
    this.userForm.valueChanges.subscribe(value => {
      console.log('Form value:', value);
      console.log('Form valid:', this.userForm.valid);
      console.log('Form errors:', this.userForm.errors);
      
      // Log individual control errors
      Object.keys(this.userForm.controls).forEach(key => {
        const controlErrors = this.userForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Errors in ${key}:`, controlErrors);
        }
      });
    });
  }

  userFormBuilder(){
    this.userForm = this.formBuilder.group({
      firstName : ["",Validators.required],
      lastName :["",[Validators.maxLength(5),Validators.required]],
      email  : ["",[Validators.required,Validators.email]],
      password : ["",[Validators.required,Validators.minLength(8)]],
      confirmPassword : ["",[Validators.required,Validators.minLength(8)]]
    }, {validator :misMatchPassword})
    this.userForm.valueChanges.subscribe(value => {
      console.log('Form value:', value);
      console.log('Form valid:', this.userForm.valid);
    });
  }
  onSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm);
      const email = this.userForm.value.email;
      const password = this.userForm.value.password;
  
      localStorage.setItem('signUpEmail', email);
      localStorage.setItem('signUpPassword',password);
      console.log('signUp successfully')

      this.router.navigate(['/auth/login'])
    }
   
  }
  // navigateToLogin(){
    
  // }
  


}
