import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.interface';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product/product.service';
import { MessagesService } from '../../services/messages/messages.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'stock', 'price', 'action'];
  categories: Category[] = [];
  products: Product[] = [];
  filters = {
    name: '',
    category: ''
  }

  constructor(
    private productService: ProductService,
    private messageService: MessagesService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  async getProducts(){
    try {
      console.log('getProducts')
      this.productService.searchProducts(this.filters).subscribe(res => {
        this.products = res
        console.log({products: this.products, res})
      })
    } catch (e) {
      console.log({e})
    }
  }

  async deleteProduct(product: Product){
    try {
      this.messageService.confirm('Desea eliminar este producto?')
        .then(async res => {
          if(res.value){
            await this.productService.deleteProduct(product)
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

}
