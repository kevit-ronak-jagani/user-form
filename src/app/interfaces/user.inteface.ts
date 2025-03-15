export interface UserEducation {
  institute: string;
  type: string;
  percentage: number;
}

export interface User {
  name: string;
  dob: string;
  formattedDob?: string;
  email: string;
  phone: string;
  gender: string;
  education: UserEducation;
  hobbies: string[];
  address?: string;
  summary?: string;
}
