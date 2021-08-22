import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublishProductRoutingModule } from './publish-product-routing.module';
import { PublishProductComponent } from './publish-product.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublishProductComponent
  ],
  imports: [
    CommonModule,
    PublishProductRoutingModule,
    FormsModule
  ]
})
export class PublishProductModule { }
