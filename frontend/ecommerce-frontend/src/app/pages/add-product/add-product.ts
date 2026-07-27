import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product';
import { CategoryService } from '../../services/category';
import { SubCategoryService } from '../../services/subcategory';
import { BrandService } from '../../services/brand';
import { ToastService } from '../../services/toast';

import { Brand } from '../../models/brand';
import { Category } from '../../models/category';
import { SubCategory } from '../../models/SubCategory';

interface CreateProduct {
  title: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  brandId: string;
  categoryId: string;
  subCategoryId: string;
  colors: string;
  sizes: string;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct implements OnInit {
  product: CreateProduct = {
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

  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  brands: Brand[] = [];

  image!: File;

  loading = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private brandService: BrandService,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data || [];
      },
    });

    this.subCategoryService.getSubCategories().subscribe({
      next: (res: any) => {
        this.subCategories = res.data || [];
      },
    });

    this.brandService.getBrands().subscribe({
      next: (res: any) => {
        this.brands = res.data || [];
      },
    });
  }

  addNewBrand() {
    const name = prompt('Enter Brand Name');

    if (!name?.trim()) return;

    this.brandService.createBrand({ name: name.trim() }).subscribe({
      next: (res: any) => {
        this.toast.showSuccess('Brand Added Successfully');

        this.loadDropdownData();

        if (res.data?._id) {
          this.product.brandId = res.data._id;
        }
      },
      error: (err: any) => {
        this.toast.showError(err.error?.massage || 'Failed');
      },
    });
  }

  addNewCategory() {
    const name = prompt('Enter Category Name');

    if (!name?.trim()) return;

    this.categoryService.createCategory({ name: name.trim() }).subscribe({
      next: (res: any) => {
        this.toast.showSuccess('Category Added Successfully');

        this.loadDropdownData();

        if (res.data?._id) {
          this.product.categoryId = res.data._id;
        }
      },
      error: (err: any) => {
        this.toast.showError(err.error?.massage || 'Failed');
      },
    });
  }

  addNewSubCategory() {
    const name = prompt('Enter SubCategory Name');

    if (!name?.trim()) return;

    this.subCategoryService
      .createSubCategory({
        name: name.trim(),
        categoryId: this.product.categoryId,
      })
      .subscribe({
        next: (res: any) => {
          this.toast.showSuccess('SubCategory Added Successfully');

          this.loadDropdownData();

          if (res.data?._id) {
            this.product.subCategoryId = res.data._id;
          }
        },
        error: (err: any) => {
          this.toast.showError(err.error?.massage || 'Failed');
        },
      });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.image = input.files[0];
    }
  }

  createProduct() {
    if (
      !this.product.title.trim() ||
      !this.product.description.trim() ||
      !this.product.brandId ||
      !this.product.categoryId ||
      !this.product.subCategoryId
    ) {
      this.toast.showError('Please Fill All Fields');
      return;
    }

    if (!this.image) {
      this.toast.showError('Please Select Image');
      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('title', this.product.title.trim());

    formData.append('description', this.product.description.trim());

    formData.append('price', String(this.product.price));

    formData.append('discount', String(this.product.discount));

    formData.append('stock', String(this.product.stock));

    formData.append('brandId', this.product.brandId);

    formData.append('categoryId', this.product.categoryId);

    formData.append('subCategoryId', this.product.subCategoryId);

    formData.append(
      'colors',
      JSON.stringify(
        this.product.colors
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean),
      ),
    );

    formData.append(
      'sizes',
      JSON.stringify(
        this.product.sizes
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      ),
    );

    formData.append('images', this.image);

    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.loading = false;

        this.toast.showSuccess('Product Added Successfully');

        this.router.navigate(['/admin-dashboard']);
      },

      error: (err: any) => {
        this.loading = false;

        this.toast.showError(err.error?.massage || 'Failed To Add Product');
      },
    });
  }
}
