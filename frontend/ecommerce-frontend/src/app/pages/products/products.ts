import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../../components/product-card/product-card';
import { Loading } from '../../components/loading/loading';
import { ProductService } from '../../services/product';
import { CategoryService } from '../../services/category';
import { Category } from '../../models/category';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCard, Loading],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: any[] = [];
  categories: Category[] = [];
  searchTerm = '';
  selectedCategory = '';
  loading = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
      error: () => {},
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.selectedCategory = '';
      this.loadProducts();
      return;
    }

    this.loading = true;
    this.selectedCategory = '';
    this.productService.searchProducts(this.searchTerm.trim()).subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onCategorySelect(categoryId: string) {
    this.searchTerm = '';
    this.selectedCategory = categoryId;

    if (!categoryId) {
      this.loadProducts();
      return;
    }

    this.loading = true;
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
