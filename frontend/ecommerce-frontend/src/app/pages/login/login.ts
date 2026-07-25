import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { RouterModule } from '@angular/router';

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

  constructor(private auth: Auth) {}

  login() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.auth.login(data).subscribe({
      next: (res: any) => {
        console.log(res);

        this.auth.saveToken(res.data.access_token);
        this.auth.saveUser(res.data.user);

        alert('Login successfully');
      },
      error: (err) => {
        console.log(err);
        alert(err.error?.message || err.error?.massage || 'Login failed');
      },
    });
  }
}
