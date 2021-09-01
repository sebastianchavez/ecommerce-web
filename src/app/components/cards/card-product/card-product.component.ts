import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    id: '',
    isDeleted: false,
    stock: 0,
    stockPending: 0,
    stockVending: 0,
    createdAt: new Date(),
    nameImage: ''
  };
  @Output() clickAddCart: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addCart(){
    this.clickAddCart.emit(this.product)
  }
}
