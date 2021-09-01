import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent, DialogContentCart } from './cart.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputTextModule } from '../../components/inputs/input-text/input-text.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    CartComponent,
    DialogContentCart
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    InputTextModule,
    MatInputModule,

  ]
})
export class CartModule { }
