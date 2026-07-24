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
  brandId: any;
  categoryId: any;
  subCategoryId: any;
}
