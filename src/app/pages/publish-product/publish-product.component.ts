import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-publish-product',
  templateUrl: './publish-product.component.html',
  styleUrls: ['./publish-product.component.scss']
})
export class PublishProductComponent implements OnInit {

  noImage = 'assets/imgs/sinimagen.png'
  loadImage = 'assets/imgs/loading.gif'
  btnLoad: boolean = false;
  data: Product = {
    image: '',
    name: '',
    price: 0,
    category: '',
    quant: 0,
    createdAt: new Date()
  }

  load: boolean = false
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  async saveProduct(){
    try {
      this.btnLoad = true;
      this.data.createdAt = new Date();
      const response = await this.productService.saveProduct(this.data)
      this.data = {
        category: '',
        createdAt: new Date(),
        image: '',
        name: '',
        price: 0,
        quant: 0
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
}
