import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'publish',
    loadChildren: () => import('./pages/publish-product/publish-product.module').then(m => m.PublishProductModule)
  },
  {
    path: 'admin-products',
    loadChildren: () => import('./pages/admin-products/admin-products.module').then(m => m.AdminProductsModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'checkout/:id',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'admin-products',
    loadChildren: () => import('./pages/admin-products/admin-products.module').then(m => m.AdminProductsModule)
  },
  {
    path: 'admin-categories',
    loadChildren: () => import('./pages/admin-categories/admin-categories.module').then(m => m.AdminCategoriesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
