import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { Wishlist } from './pages/wishlist/wishlist';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AddProduct } from './pages/add-product/add-product';
import { EditProduct } from './pages/edit-product/edit-product';
import { ProductDetails } from './pages/product-details/product-details';
import { Profile } from './pages/profile/profile';
import { Checkout } from './pages/checkout/checkout';
import { Orders } from './pages/orders/orders';
import { authGuard } from './guards/auth-guard';
import { adminGuardGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'products/:id', component: ProductDetails },
  { path: 'login', component: Login },
  { path: 'signup', component: Register },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [adminGuardGuard],
  },
  {
    path: 'add-product',
    component: AddProduct,
    canActivate: [adminGuardGuard],
  },
  {
    path: 'edit-product/:id',
    component: EditProduct,
    canActivate: [adminGuardGuard],
  },

  { path: 'wishlist', component: Wishlist, canActivate: [authGuard] },
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  { path: 'orders', component: Orders, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
