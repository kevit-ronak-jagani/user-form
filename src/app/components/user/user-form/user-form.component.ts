import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.inteface';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [DatePipe],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;
  userDetails: User | null = null;
  maxDate = new Date().toISOString().split('T')[0];

  readonly hobbies = [
    { id: 1, name: 'Reading' },
    { id: 2, name: 'Sports' },
    { id: 3, name: 'Music' },
    { id: 4, name: 'Gaming' },
    { id: 5, name: 'Traveling' },
    { id: 6, name: 'Cooking' },
  ];

  readonly educationTypes = [
    'SSC',
    'HSC',
    'Diploma',
    'B.Tech',
    'M.Tech',
    'BCA',
    'MCA',
    'B.Sc',
    'M.Sc',
    'Other',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.userDetails = this.userService.getUserDetails();
    if (this.userDetails) {
      this.userForm.patchValue(this.userDetails);
      this.userDetails.hobbies?.forEach((hobby: string) => {
        (this.userForm.get('hobbies') as FormArray).push(
          this.fb.control(hobby)
        );
      });
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z]+([ '-][a-zA-Z]+)*$"),
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      education: this.fb.group({
        institute: ['', Validators.required],
        type: ['', Validators.required],
        percentage: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
      }),
      hobbies: this.fb.array([]),
      address: [''],
      summary: [''],
    });
  }

  onCheckboxChange(event: any) {
    const hobbiesArray = this.userForm.get('hobbies') as FormArray;

    if (event.target.checked) {
      hobbiesArray.push(this.fb.control(event.target.value));
    } else {
      const index = hobbiesArray.controls.findIndex(
        (control) => control.value === event.target.value
      );
      if (index >= 0) {
        hobbiesArray.removeAt(index);
      }
    }
  }

  isHobbySelected(hobby: string): boolean {
    const hobbiesArray = this.userForm.get('hobbies') as FormArray;
    return hobbiesArray.controls.some((control) => control.value === hobby);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) return;
    const formData = {
      ...this.userForm.value,
      formattedDob: this.dateService.formatDate(this.userForm.value.dob),
    };

    this.userService.saveUserDetails(formData);

    this.router.navigate(['/user-details']);
  }

  onReset(): void {
    this.submitted = false;
    this.userDetails = null;
    this.userForm.reset();
    this.userService.clearUserDetails();
  }
}
