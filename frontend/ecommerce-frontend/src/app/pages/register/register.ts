import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  signupData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    age: 0,
    gender: 'Male',
    phoneNumber: '',
  };

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  signup() {
    this.auth.signup(this.signupData).subscribe({
      next: (res: any) => {
        alert('Account Created Successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.massage);
      },
    });
  }
}
