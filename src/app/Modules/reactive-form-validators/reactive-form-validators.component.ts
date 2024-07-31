import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { misMatchPassword } from '../../core/Custom-validators/misMatchPassword';

@Component({
  selector: 'app-reactive-form-validators',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './reactive-form-validators.component.html',
  styleUrl: './reactive-form-validators.component.css'
})
export class ReactiveFormValidatorsComponent {

  userForm!: FormGroup

  constructor(private formBuilder : FormBuilder){
    // this.userForm = new FormGroup({
    //   firstName : new FormControl("",Validators.required),
    //   lastName : new FormControl("",[Validators.maxLength(5),Validators.required]),
    //   email  : new FormControl("",[Validators.required,Validators.email]),
    //   password : new FormControl("",[Validators.required,Validators.minLength(8)])
    // }, {validator :misMatchPassword})
  }
  ngOnInit(){
    this.userFormBuilder();
  }

  userFormBuilder(){
    this.userForm = this.formBuilder.group({
      firstName : ["",Validators.required],
      lastName :["",[Validators.maxLength(5),Validators.required]],
      email  : ["",[Validators.required,Validators.email]],
      password : ["",[Validators.required,Validators.minLength(8)]],
      confirmPassword : ["",[Validators.required,Validators.minLength(8)]]
    }, {validator :misMatchPassword})
  }
  onSubmit(){
    console.log(this.userForm);
  }

}
