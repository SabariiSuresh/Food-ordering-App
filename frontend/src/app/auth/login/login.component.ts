import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  message = '';
  hidePassword = true;

  constructor(private form: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onLogin() {

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.authService.setToken(res.user.token);
          this.successMessage = 'Login successfully';
          setTimeout(() => {
            this.router.navigate(['/restaurants']);
          }, 2000)
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Login failed'
        }
      })
    }

  }

}
