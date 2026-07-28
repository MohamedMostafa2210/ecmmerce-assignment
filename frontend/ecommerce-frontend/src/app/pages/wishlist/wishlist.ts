import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist';
import { ToastService } from '../../services/toast';
import { DialogService } from '../../services/dialog';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  wishlist: any = null;

  constructor(
    private wishlistService: WishlistService,
    private toast: ToastService,
    private dialog: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res: any) => {
        this.wishlist = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  async clearWishlist() {
    const result = await this.dialog.confirm('Clear Wishlist?', 'This action cannot be undone.');

    if (!result.isConfirmed) return;

    this.wishlistService.clearWishlist().subscribe({
      next: () => {
        this.dialog.success('Wishlist cleared successfully');
        this.loadWishlist();
      },
      error: () => {
        this.dialog.error('Something went wrong');
      },
    });
  }

  async remove(product: any) {
    const result = await this.dialog.confirm(
      'Remove Product?',
      'Do you want to remove this product from your wishlist?',
    );

    if (!result.isConfirmed) return;

    this.wishlistService.removeFromWishlist(product._id).subscribe({
      next: () => {
        this.dialog.success('Product removed successfully');
        this.loadWishlist();
      },
      error: () => {
        this.dialog.error('Failed to remove product');
      },
    });
  }
}
