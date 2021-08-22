import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublishProductComponent } from './publish-product.component';

const routes: Routes = [
  {
    path: '',
    component: PublishProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishProductRoutingModule { }
