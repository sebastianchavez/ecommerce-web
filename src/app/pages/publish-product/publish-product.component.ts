import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.interface';
import { Category } from '../../models/category.interface';
import { CategoryService } from '../../services/category/category.service';
import { LoggerService } from '../../services/logger/logger.service';

@Component({
  selector: 'app-publish-product',
  templateUrl: './publish-product.component.html',
  styleUrls: ['./publish-product.component.scss']
})
export class PublishProductComponent implements OnInit {

  idLog: string = 'PublishProductComponent'
  noImage = 'assets/imgs/sinimagen.png'
  loadImage = 'assets/imgs/loading.gif'
  btnLoad: boolean = false;
  data: Product = {
    isDeleted: false,
    image: '',
    name: '',
    price: 0,
    category: '',
    id: '',
    stock: 0,
    stockPending: 0,
    stockVending: 0,
    createdAt: new Date(),
    nameImage: ''
  }

  filters= {
    name: ''
  }

  categories: Category[] = []
  load: boolean = false
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private logger: LoggerService
    ) { }

  ngOnInit(): void {
  }

  async saveProduct(){
    try {
      this.btnLoad = true;
      this.data.createdAt = new Date();
      const response = await this.productService.saveProduct(this.data)
      this.data = {
        isDeleted: false,
        category: '',
        createdAt: new Date(),
        image: '',
        name: '',
        price: 0,
        id: '',
        stock: 0,
        stockPending: 0,
        stockVending: 0,
        nameImage: ''
      }
      this.btnLoad = false;
      console.log('RESPONSE:', response)
    } catch (e) {
      this.btnLoad = false;
      console.log('Error:', e)
    }
  }

  onSelectImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.load = true
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = async (e: any) => {
        try {
          const fileName = Date.now() + '.' + event.target.files[0].name.split('.')[1]
          this.data.nameImage = fileName;
          await this.productService.uploadPicture(fileName, e.target.result)
          this.data.image = await this.productService.getDownloadURL(fileName).toPromise()
          this.load = false
        } catch (e) {
          this.load = false
          console.log('ERROR:', e)
        }
      };
    }
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
