import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: any = null;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
    window.location.href = '/login';
  }
}
