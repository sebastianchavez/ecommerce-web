import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCategoriesRoutingModule } from './admin-categories-routing.module';
import { AdminCategoriesComponent, DialogContentCategory } from './admin-categories.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AdminCategoriesComponent,
    DialogContentCategory
  ],
  exports: [
    AdminCategoriesComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    AdminCategoriesRoutingModule
  ]
})
export class AdminCategoriesModule { }
