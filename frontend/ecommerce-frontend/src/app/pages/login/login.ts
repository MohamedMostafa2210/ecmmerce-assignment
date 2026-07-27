import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private toast: ToastService,
  ) {}

  login() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.auth.login(data).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.data.access_token);
        this.auth.saveUser(res.data.user);

        this.toast.showSuccess('Login successfully');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.log(err);
        this.toast.showError(err.error?.message || err.error?.massage || 'Login failed');
      },
    });
  }
}
