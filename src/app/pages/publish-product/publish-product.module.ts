import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublishProductRoutingModule } from './publish-product-routing.module';
import { PublishProductComponent } from './publish-product.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    PublishProductComponent
  ],
  imports: [
    CommonModule,
    PublishProductRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class PublishProductModule { }
