import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

registerForm! : FormGroup;
successMessage = '';
errorMessage = '';
message = '';
hidePassword = true

constructor( private authService : AuthService , private router : Router , private form : FormBuilder){}

ngOnInit(): void {
  this.registerForm = this.form.group({
    name : new FormControl ('' , [Validators.required]),
    email : new FormControl ('' , [Validators.required , Validators.pattern('[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,3}')]),
    password : new FormControl ('' , [Validators.required , this.passwordConditionValidator()])
  })
}

passwordConditionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;
    if (!value) return null; 
    if (!/[A-Z]/.test(value)){
     return { missingUppercase: true };
    } 
    if (!/[a-z]/.test(value)) {
      return { missingLowercase: true };
    }
    if (!/\d/.test(value)) {
      return { missingNumber: true };
    }
    if (!/[@$!%*?&]/.test(value)) {
      return { missingSpecialCharacter: true };
    } 
    if(value.length < 6){
      return { minLength : true }
    }
    
    return null;
  };
}


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  

onRegister(){
  
  if(this.registerForm.valid){
    this.authService.register(this.registerForm.value).subscribe({
      next : ()=>{
        this.successMessage = 'Registered successfully';
        this.errorMessage = '';
        setTimeout(()=>{
          this.router.navigate(['/login'])
        },2000)
      },
      error : err =>{
        this.errorMessage = err.error?.message || 'Registrer failed'
      }
    })
  }

}

}
