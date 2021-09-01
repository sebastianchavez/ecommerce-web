import { Component, Inject, OnInit } from '@angular/core';
import { Option } from '../../models/option.interface';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product/product.service';
import { AppComponent } from '../../app.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductCart } from '../../models/product-cart.interface';
import { CategoryService } from '../../services/category/category.service';
import { Category } from 'src/app/models/category.interface';
import { LoggerService } from '../../services/logger/logger.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  idLog:string = 'ProductsComponent'
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
  productsCart: ProductCart[] = []
  categories: Category[] = []

  finish: boolean = false

  filters = {
    date: true,
    name: false,
    price: false,
    limit: 6,
    order: 'id'
  }
  pagination = {
    totalProducts: 0,
    page: 1,
    totalPages: 1,
    pages: [1]
  }
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private logger: LoggerService,
    private app: AppComponent,
  ) { 
    this.getCategories()
  }

  async ngOnInit() {
      this.pagination.pages = []
      this.pagination.totalProducts = await this.productService.collectionCount()
    this.pagination.totalPages = Math.round(this.pagination.totalProducts / this.filters.limit)
    for (let i = 1; i < this.pagination.totalPages; i++) {
      this.pagination.pages.push(i)
    }
    this.getProduct()
    this.getLocalProducts()
  } 

  openDialog(product: Product) {
    const dialogRef = this.dialog.open(DialogContentProduct,{
      width: '250px',
      data: {...product, quant: 0}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addCart({...product, quant: result})
      console.log(`Dialog result: ${result}`);
    });
  }


  async getProduct(){
    this.finish = false
      this.productService.getProducts(this.filters)
        .subscribe(res => {
          console.log({res})
          this.products = res
        },err => {
          console.log({err})
        })
  }

  getLocalProducts(){
    console.log('=== getLocalProducts ===')
    let productsCart: string = ''
    if(localStorage.getItem('productsCart')){
      productsCart = localStorage.getItem('productsCart')!.toString() 
    }
    this.productsCart = productsCart != '' ? JSON.parse(productsCart) : []
    console.log({products: this.productsCart})
  }

  addCart(product: ProductCart){
    this.productsCart.push(product)
    localStorage.setItem('productsCart', JSON.stringify(this.productsCart))
    this.app.counter += product.quant
  }

  back(){
    this.productService.back(this.products[0], this.filters.limit)
    .subscribe(res => {
      console.log({res})
      this.products = res
      this.pagination.page -=1
    })
  }

  next(){
      this.productService.next(this.products[this.products.length - 1], this.filters.limit, this.filters.order)
        .subscribe(res => {
          console.log({res})
          res.forEach(x => {
            this.products.push(x)
          })
          if(res.length == 0){
            this.finish = true
          }
        })
  }

  getCategories(){
    this.categoryService.searchCategory(this.filters)
      .subscribe(res => {
        this.categories = res
        this.logger.log(this.idLog, 'getCategories', {info: 'Success get categories', response: res})
      },err => {
        this.logger.error(this.idLog, 'getCategories', {info: 'Error get categories', error: err})
      })
  }
}

@Component({
  selector: 'dialog-content-product',
  templateUrl: 'dialog-content-product.html',
})
export class DialogContentProduct {
  constructor(
    public dialogRef: MatDialogRef<DialogContentProduct>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCart) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}