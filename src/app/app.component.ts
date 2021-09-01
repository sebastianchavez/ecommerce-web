import { Component } from '@angular/core';
import { Menu } from './models/menu.interface';
import { ProductCart } from './models/product-cart.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  productsCart: ProductCart[] = []
  title = 'ecommerce-web';
  public counter: number = 0;
  menu: Array<Menu> = [
    {
      name: 'Publicar',
      router: 'publish'
    },
    {
      name: 'Productos',
      router: 'products'
    },
    {
      name: 'Mantenedor Productos',
      router: 'admin-products'
    },
    {
      name: 'Mantenedor Categorías',
      router: 'admin-categories'
    }
  ]

  constructor(){
    this.getLocalProducts()
  }

  getLocalProducts(){
    this.counter = 0
    console.log('=== getLocalProducts ===')
    let productsCart: string = ''
    if(localStorage.getItem('productsCart')){
      productsCart = localStorage.getItem('productsCart')!.toString() 
    }
    this.productsCart = productsCart != '' ? JSON.parse(productsCart) : []
    if(productsCart.length > 0){
      this.productsCart.forEach(x => {
        this.counter += x.quant ? x.quant : 0
      })
    }
    console.log('WTF:',{products: this.productsCart, counter: this.counter})
  }

}
