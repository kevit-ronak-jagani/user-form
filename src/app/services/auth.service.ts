import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (
      email === environment.auth.email &&
      password === environment.auth.password
    ) {
      localStorage.setItem('user', JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
