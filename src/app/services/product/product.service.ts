import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Product } from '../../models/product.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection: AngularFirestoreCollection<Product>;

  constructor(
      private angularFirestore: AngularFirestore,
      private angularFireStorage: AngularFireStorage) {
    this.productCollection = angularFirestore.collection<Product>('products')
  }

  saveProduct(product: Product, producId?: string): Promise<any>{
    return new Promise(async (resolve, reject) => {
      try {
        const id = producId || this.angularFirestore.createId();
        const data = {id, ... product};
        const result = await this.productCollection.doc(id).set(data);
        resolve(result)
      } catch (e) {
        reject(e.message)
      }
    })
  }

  getProducts():Observable<any>{
    return this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a =>a.payload.doc.data() as Product))
      )
  }

  uploadPicture(name: string, image: any) {
    return this.angularFireStorage.ref('pictures/products/' + name).putString(image, 'data_url');
  }

  getDownloadURL(name: string) {
    return this.angularFireStorage.ref('pictures/products/' + name).getDownloadURL();
  }

  getProduct(){

  }

  deleteProduct(productId: string){
    return new Promise (async (resolve, reject) => {
      try {
        const result = await this.productCollection.doc(productId).delete()
        resolve(result)
      } catch (e) {
        reject(e.message)
      }
    })
  }

  updateProduct(){

  }
}
