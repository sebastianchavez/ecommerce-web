import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableProductsComponent } from './table-products.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    TableProductsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class TableProductsModule { }
