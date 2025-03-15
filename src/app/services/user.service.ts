import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.inteface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'userDetails';

  constructor() {}

  saveUserDetails(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUserDetails(): User | null {
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  clearUserDetails(): void {
    localStorage.removeItem(this.storageKey);
  }
}
