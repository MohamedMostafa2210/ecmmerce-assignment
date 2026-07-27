import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { CategoryService } from '../../services/category';
import { SubCategoryService } from '../../services/subcategory';
import { BrandService } from '../../services/brand';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct implements OnInit {
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

  productId = '';
  loading = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDropdownData();
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.productId) {
      this.loading = false;
      return;
    }

    this.productService.getProductById(this.productId).subscribe({
      next: (res: any) => {
        const data = res.data;
        this.product = {
          title: data.title,
          description: data.description,
          price: data.price,
          discount: data.discount || 0,
          stock: data.stock,
          brandId: data.brandId?._id || data.brandId || '',
          categoryId: data.categoryId?._id || data.categoryId || '',
          subCategoryId: data.subCategoryId?._id || data.subCategoryId || '',
          colors: Array.isArray(data.colors) ? data.colors.join(',') : '',
          sizes: Array.isArray(data.sizes) ? data.sizes.join(',') : '',
        };
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast.showError('Failed to load product');
      },
    });
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
        this.toast.showSuccess('Brand created successfully!');
        this.brandService.getBrands().subscribe((bRes: any) => {
          this.brands = bRes.data || [];
          if (res.data?._id) this.product.brandId = res.data._id;
        });
      },
      error: (err: any) => this.toast.showError(err.error?.massage || 'Failed to create brand'),
    });
  }

  addNewCategory() {
    const name = prompt('Enter new Category name:');
    if (!name || !name.trim()) return;

    this.categoryService.createCategory({ name: name.trim() }).subscribe({
      next: (res: any) => {
        this.toast.showSuccess('Category created successfully!');
        this.categoryService.getCategories().subscribe((cRes: any) => {
          this.categories = cRes.data || [];
          if (res.data?._id) this.product.categoryId = res.data._id;
        });
      },
      error: (err: any) => this.toast.showError(err.error?.massage || 'Failed to create category'),
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
          this.toast.showError('SubCategory created successfully!');
          this.subCategoryService.getSubCategories().subscribe((scRes: any) => {
            this.subCategories = scRes.data || [];
            if (res.data?._id) this.product.subCategoryId = res.data._id;
          });
        },
        error: (err: any) =>
          this.toast.showError(err.error?.massage || 'Failed to create subcategory'),
      });
  }

  updateProduct() {
    const payload = {
      title: this.product.title,
      description: this.product.description,
      price: Number(this.product.price),
      discount: Number(this.product.discount),
      stock: Number(this.product.stock),
      brandId: this.product.brandId,
      categoryId: this.product.categoryId,
      subCategoryId: this.product.subCategoryId,
      colors: this.product.colors
        ? this.product.colors.split(',').map((c: string) => c.trim())
        : [],
      sizes: this.product.sizes ? this.product.sizes.split(',').map((s: string) => s.trim()) : [],
    };

    this.productService.updateProduct(this.productId, payload).subscribe({
      next: () => {
        this.toast.showSuccess('Product Updated Successfully');
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        console.log(err);
        this.toast.showError(err.error?.massage || 'Failed to update product');
      },
    });
  }
}
