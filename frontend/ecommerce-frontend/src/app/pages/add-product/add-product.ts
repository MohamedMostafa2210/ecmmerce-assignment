import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  product: any = {
    title: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 0,
    brandId: '',
    categoryId: '',
    subCategoryId: '',
    colors: '',
    sizes: '',
  };

  image!: File;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  onFileChange(event: any) {
    this.image = event.target.files[0];
  }

  createProduct() {
    const formData = new FormData();

    formData.append('title', this.product.title);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price);

    formData.append('discount', this.product.discount);

    formData.append('stock', this.product.stock);

    formData.append('brandId', this.product.brandId);

    formData.append('categoryId', this.product.categoryId);

    formData.append('subCategoryId', this.product.subCategoryId);

    formData.append('colors', JSON.stringify(this.product.colors.split(',')));

    formData.append('sizes', JSON.stringify(this.product.sizes.split(',')));

    formData.append('images', this.image);

    this.productService.createProduct(formData).subscribe({
      next: () => {
        alert('Product Added Successfully');
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
