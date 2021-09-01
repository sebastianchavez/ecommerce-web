import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './card-product.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    CardProductComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    CardProductComponent
  ]
})
export class CardProductModule { }
