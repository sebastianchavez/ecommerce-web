import { Component, OnInit } from '@angular/core';
import { Option } from '../../models/option.interface';
import { Product } from '../../models/product.interface';

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

  products: Product[] = [
    {
      image: '',
      name: '',
      price: 0
    },
    {
      image: '',
      name: '',
      price: 0
    },
    {
      image: '',
      name: '',
      price: 0
    },
    {
      image: '',
      name: '',
      price: 0
    },
    {
      image: '',
      name: '',
      price: 0
    },
    {
      image: '',
      name: '',
      price: 0
    },
    {
      image: '',
      name: '',
      price: 0
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
