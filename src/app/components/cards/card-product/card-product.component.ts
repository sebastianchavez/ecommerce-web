import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  @Input() product: Product = {
    image: 'assets/imgs/integral.jpg',
    name: 'Pan molde - integral',
    price: 2500,
    category: '',
    quant: 0,
    createdAt: new Date()
  };
  constructor() { }

  ngOnInit(): void {
  }

}
