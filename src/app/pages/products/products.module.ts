import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent, DialogContentProduct } from './products.component';
import { InputTextModule } from '../../components/inputs/input-text/input-text.module';
import { InputSelectModule } from '../../components/inputs/input-select/input-select.module';
import { CardCategoryModule } from '../../components/cards/card-category/card-category.module';
import { CardProductModule } from '../../components/cards/card-product/card-product.module';
import { PaginationModule } from '../../components/pagination/pagination.module';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProductsComponent,
    DialogContentProduct
  ],
  imports: [
    CardCategoryModule,
    CardProductModule,
    InputTextModule,
    InputSelectModule,
    CommonModule,
    ProductsRoutingModule,
    PaginationModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatButtonModule
    
    // MatMenuModule,
  ]
})
export class ProductsModule { }
