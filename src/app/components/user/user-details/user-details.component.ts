import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.inteface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userDetails: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userDetails = this.userService.getUserDetails();
    if (!this.userDetails) {
      this.router.navigate(['/user-form']);
    }
  }

  get filteredHobbies(): string {
    if (this.userDetails?.hobbies) {
      return this.userDetails.hobbies
        .filter((hobby) => hobby?.trim().length)
        .join(', ');
    }
    return '';
  }

  onEdit() {
    this.router.navigate(['/user-form']);
  }

  onLogout() {
    this.userService.clearUserDetails();
    this.router.navigate(['/']);
  }
}
