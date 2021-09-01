import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductsRoutingModule } from './admin-products-routing.module';
import { AdminProductsComponent } from './admin-products.component';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    AdminProductsRoutingModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class AdminProductsModule { }
