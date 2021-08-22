import { Component, OnInit } from '@angular/core';
import { Option } from '../../models/option.interface';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  options: Option[] = [
    {
      text: 'Orden - Precio',
      value: 'price'
    },
    {
      text: 'Orden - Nombre',
      value: 'name'
    },
  ]

  products: Product[] = []
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct()
  }

  async getProduct(){
    try {
      console.log('getProducts')
      this.productService.getProducts()
        .subscribe(res => {
          console.log({res})
          this.products = res
        },err => {
          console.log({err})
        })
      // console.log('RESPONSE:', response)
    } catch (e) {
      console.log('ERROR:', e)
    }
  }
}
