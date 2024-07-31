import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,FormControl,Validators, ValidatorFn} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm! : FormGroup
  formFields: any;
  loginErrorMessage: string | null = null;

  constructor(private http:HttpClient,private fb:FormBuilder,private router : Router){}

  ngOnInit(){
    this.loginForm = this.fb.group({});
    this.fetchLoginForm();
    if (browserRefresh) {
      localStorage.setItem('email', "");
      this.router.navigate(['/auth/signUp']);
    }
  }


  fetchLoginForm() {
    this.http.get('assets/form-config.json').subscribe({
      next: (config: any) => {
        console.log('Fetched config:', config);  // Debug log
        if (config && config.fields) {
          this.formFields = config.fields;
          this.buildForm(this.formFields);
        } else {
          console.error('Invalid config format', config);  // Error log
        }
      },
      error: (err) => {
        console.error('Error fetching form config:', err);  // Error log
      }
    });
  }

  buildForm(fields: any[]) {
    if (!fields) {
      console.error('Fields parameter is undefined');  // Error log
      return;
    }

    const formGroup: any = {};
    fields.forEach(field => {
      const validators = this.getValidators(field.validators);
      formGroup[field.formControlName] = new FormControl('', validators);
    });
    this.loginForm = new FormGroup(formGroup);
    console.log('Built form:', this.loginForm);  // Debug log
  }

  getValidators(validators: string[]): ValidatorFn[] {
    const formValidators: ValidatorFn[] = [];
    validators.forEach(validator => {
      if (validator === 'required') {
        formValidators.push(Validators.required);
      } else if (validator.startsWith('maxLength')) {
        const maxLength = parseInt(validator.split(':')[1], 10);
        formValidators.push(Validators.maxLength(maxLength));
      } else if (validator.startsWith('minLength')) {
        const minLength = parseInt(validator.split(':')[1], 10);
        formValidators.push(Validators.minLength(minLength));
      } else if (validator === 'email') {
        formValidators.push(Validators.email);
      }
    });
    return formValidators;
  }

  onLogin() {
    console.log(this.loginForm.value);

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    const storedEmail  = localStorage.getItem('signUpEmail');
    const storedPassword = localStorage.getItem('signUpPassword');

    if(email != storedEmail){
     this.loginErrorMessage = 'Invalid email id.';
    }else if(password != storedPassword){
     this.loginErrorMessage = "Invalid password."
    }else {
     console.log('Login Successfully!');
     this.router.navigate(['/auth/home']);
    }
  }
  getField(fieldName: string): any {
    return this.formFields.find((f: { formControlName: string; }) => f.formControlName === fieldName);
  }
  getLabel(fieldName: string): string {
    const field = this.getField(fieldName);
    return field ? field.label : '';
  }
  
  getType(fieldName: string): string {
    const field = this.getField(fieldName);
    return field ? field.type : 'text';
  }

  getMinLength(fieldName: string): number {
    const field = this.getField(fieldName);
    if (field && field.validators) {
      const minLengthValidator = field.validators.find((v: string) => v.startsWith('minLength'));
      return minLengthValidator ? parseInt(minLengthValidator.split(':')[1], 10) : 0;
    }
    return 0;
  }

  getMaxLength(fieldName: string): number {
    const field = this.getField(fieldName);
    if (field && field.validators) {
      const maxLengthValidator = field.validators.find((v: any) => v.startsWith('maxLength'));
      return maxLengthValidator ? parseInt(maxLengthValidator.split(':')[1], 10) : Infinity;
    }
    return Infinity;
  }

}
