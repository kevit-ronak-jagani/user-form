import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  errorMessage: string = '';

  login() {
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    if (this.authService.login(email, password)) {
      this.router.navigate(['/user-form']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  // Add this property to your component class
  // Add this property to your component class
  showPassword = false;

  // Add this method to your component class
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
