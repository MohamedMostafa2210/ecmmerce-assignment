import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { ToastService } from '../../services/toast';

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
    confirmPassword: '',
    age: 0,
    gender: 'Male',
    phoneNumber: '',
  };

  constructor(
    private auth: Auth,
    private toast: ToastService,
    private router: Router,
  ) {}

  signup() {
    this.auth.signup(this.signupData).subscribe({
      next: (res: any) => {
        this.toast.showSuccess('Account Created Successfully');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.toast.showError(err.error?.massage || 'Signup failed');
      },
    });
  }
}
