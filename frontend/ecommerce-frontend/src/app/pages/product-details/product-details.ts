import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { WishlistService } from '../../services/wishlist';
import { ReviewService } from '../../services/review';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product: any = null;
  reviews: any[] = [];
  loading = true;
  error = '';

  newComment = '';
  newRate = 5;
  submittingReview = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private reviewService: ReviewService,
    private auth: Auth,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      this.error = 'Product not found';
      return;
    }

    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        this.product = res.data;
        this.loading = false;
        this.loadReviews();
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load product';
      },
    });
  }

  loadReviews(): void {
    if (!this.product?._id) return;
    this.reviewService.getReviews(this.product._id).subscribe({
      next: (res: any) => {
        this.reviews = res.data || [];
      },
      error: () => {},
    });
  }

  submitReview(): void {
    if (!this.isLoggedIn()) {
      alert('Please login to leave a review.');
      return;
    }
    if (!this.newComment.trim()) {
      alert('Please write a comment before submitting.');
      return;
    }

    this.submittingReview = true;
    this.reviewService
      .addReview({
        productId: this.product._id,
        comment: this.newComment.trim(),
        rate: Number(this.newRate),
      })
      .subscribe({
        next: () => {
          alert('Review added successfully!');
          this.newComment = '';
          this.newRate = 5;
          this.submittingReview = false;
          this.loadReviews();
        },
        error: (err: any) => {
          this.submittingReview = false;
          alert(err.error?.massage || 'Failed to submit review');
        },
      });
  }

  deleteReview(reviewId: string): void {
    if (!confirm('Are you sure you want to delete this review?')) return;
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        alert('Review deleted.');
        this.loadReviews();
      },
      error: (err: any) => {
        alert(err.error?.massage || 'Failed to delete review');
      },
    });
  }

  imageUrl(path: string) {
    return 'http://localhost:3001/' + path;
  }

  isLoggedIn() {
    return this.auth.isLogIn();
  }

  get currentUser() {
    return this.auth.getUser();
  }

  addToCart() {
    if (!this.isLoggedIn()) {
      alert('Please login first');
      return;
    }

    this.cartService.addToCart(this.product._id).subscribe({
      next: () => alert('Product Added To Cart'),
      error: (err) => alert(err.error?.massage || 'Failed to add to cart'),
    });
  }

  addToWishlist() {
    if (!this.isLoggedIn()) {
      alert('Please login first');
      return;
    }

    this.wishlistService.addToWishlist(this.product._id).subscribe({
      next: () => alert('Added to Wishlist'),
      error: (err) => alert(err.error?.massage || 'Failed to add to wishlist'),
    });
  }
}
