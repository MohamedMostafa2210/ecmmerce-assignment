import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CategoryService } from '../../services/category';
import { SubCategoryService } from '../../services/subcategory';
import { BrandService } from '../../services/brand';

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

  categories: any[] = [];
  subCategories: any[] = [];
  brands: any[] = [];

  image!: File;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private brandService: BrandService,
    private router: Router,
  ) {
    this.loadDropdownData();
  }

  loadDropdownData() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => (this.categories = res.data || []),
    });
    this.subCategoryService.getSubCategories().subscribe({
      next: (res: any) => (this.subCategories = res.data || []),
    });
    this.brandService.getBrands().subscribe({
      next: (res: any) => (this.brands = res.data || []),
    });
  }

  addNewBrand() {
    const name = prompt('Enter new Brand name:');
    if (!name || !name.trim()) return;

    this.brandService.createBrand({ name: name.trim() }).subscribe({
      next: (res: any) => {
        alert('Brand created successfully!');
        this.brandService.getBrands().subscribe((bRes: any) => {
          this.brands = bRes.data || [];
          if (res.data?._id) this.product.brandId = res.data._id;
        });
      },
      error: (err: any) => alert(err.error?.massage || 'Failed to create brand'),
    });
  }

  addNewCategory() {
    const name = prompt('Enter new Category name:');
    if (!name || !name.trim()) return;

    this.categoryService.createCategory({ name: name.trim() }).subscribe({
      next: (res: any) => {
        alert('Category created successfully!');
        this.categoryService.getCategories().subscribe((cRes: any) => {
          this.categories = cRes.data || [];
          if (res.data?._id) this.product.categoryId = res.data._id;
        });
      },
      error: (err: any) => alert(err.error?.massage || 'Failed to create category'),
    });
  }

  addNewSubCategory() {
    const name = prompt('Enter new SubCategory name:');
    if (!name || !name.trim()) return;

    this.subCategoryService
      .createSubCategory({
        name: name.trim(),
        categoryId: this.product.categoryId || undefined,
      })
      .subscribe({
        next: (res: any) => {
          alert('SubCategory created successfully!');
          this.subCategoryService.getSubCategories().subscribe((scRes: any) => {
            this.subCategories = scRes.data || [];
            if (res.data?._id) this.product.subCategoryId = res.data._id;
          });
        },
        error: (err: any) => alert(err.error?.massage || 'Failed to create subcategory'),
      });
  }

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
