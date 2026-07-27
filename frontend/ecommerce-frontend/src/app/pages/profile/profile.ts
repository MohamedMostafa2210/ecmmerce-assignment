import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Auth } from '../../services/auth';
import { AddressService } from '../../services/address';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: any = null;

  addresses: any[] = [];

  address = {
    city: '',
    street: '',
    building: '',
    floor: '',
    apartment: '',
  };

  constructor(
    private auth: Auth,
    private addressService: AddressService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.loadAddresses();
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe({
      next: (res: any) => {
        this.addresses = res.data || [];
      },
    });
  }

  addAddress() {
    this.addressService.addAddress(this.address).subscribe({
      next: () => {
        this.toast.showSuccess('Address Added Successfully');

        this.address = {
          city: '',
          street: '',
          building: '',
          floor: '',
          apartment: '',
        };

        this.loadAddresses();
      },
      error: (err) => {
        this.toast.showError(err.error?.massage || 'Failed to add address');
      },
    });
  }

  deleteAddress(id: string) {
    if (!confirm('Delete Address ?')) return;

    this.addressService.deleteAddress(id).subscribe({
      next: () => {
        this.loadAddresses();
      },
    });
  }

  logout() {
    this.auth.logout();
    window.location.href = '/login';
  }
}
