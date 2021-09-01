import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCategoryComponent } from './card-category.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    CardCategoryComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    CardCategoryComponent
  ]
})
export class CardCategoryModule { }
