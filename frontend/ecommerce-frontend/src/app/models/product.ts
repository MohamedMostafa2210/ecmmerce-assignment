import { Brand } from './brand';
import { Category } from './category';
import { SubCategory } from './SubCategory';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  soldItems: number;
  colors: string[];
  sizes: string[];
  images: string[];
  averageRating: number;

  brandId: Brand;
  categoryId: Category;
  subCategoryId: SubCategory;
}
