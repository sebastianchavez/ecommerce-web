import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { InputTextModule } from '../../components/inputs/input-text/input-text.module';
import { InputSelectModule } from '../../components/inputs/input-select/input-select.module';
import { CardCategoryModule } from '../../components/cards/card-category/card-category.module';
import { CardProductModule } from '../../components/cards/card-product/card-product.module';
import { PaginationModule } from '../../components/pagination/pagination.module';


@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CardCategoryModule,
    CardProductModule,
    InputTextModule,
    InputSelectModule,
    CommonModule,
    ProductsRoutingModule,
    PaginationModule
  ]
})
export class ProductsModule { }
