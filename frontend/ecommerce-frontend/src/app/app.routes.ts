import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { Wishlist } from './pages/wishlist/wishlist';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AddProduct } from './pages/add-product/add-product';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'login', component: Login },
  {
    path: 'signup',
    component: Register,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
  },
  {
    path: 'add-product',
    component: AddProduct,
  },
  { path: 'wishlist', component: Wishlist },
  { path: 'cart', component: Cart },
  { path: '**', redirectTo: '' },
];
