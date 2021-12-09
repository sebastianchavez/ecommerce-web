import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, CollectionReference, Query } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Product } from '../../models/product.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { QueryFn } from '@angular/fire/firestore'
import * as db from 'firebase/firestore'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  saveProduct(product: Product, producId?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = producId || this.angularFirestore.createId();
        const data = { ...product, id };
        const result = await this.productCollection.doc(id).set(data);
        resolve(result)
      } catch (e: any) {
        reject(e.message)
      }
    })
  }

  searchProducts(filters: any): Observable<any> {
    let queryFn: QueryFn = (ref => ref)
    if (filters.name != '') {
      queryFn = filters.category == '' ? (ref => ref.orderBy('name').startAt(filters.name).endAt(filters.name + '\uf8ff').limit(filters.limit)) : (ref => ref.where('name', '==', filters.name).where('category', '==', filters.category).limit(filters.limit))
    } 
    this.productCollection = this.angularFirestore.collection<Product>('products', queryFn)
    return this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product))
    )
  }

  getProducts(filters: any): Observable<any> {
    this.productCollection = this.angularFirestore.collection<Product>('products', ref => ref.orderBy(filters.order).limit(filters.limit))
    return this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product))
    )
  }

  async collectionCount() {
    this.productCollection = this.angularFirestore.collection<Product>('products')
    let snapshot = await this.productCollection.get();
    return (await snapshot.pipe().toPromise()).size
  }

  next(lastDocument: any, limit: number, order: string) {
    console.log({ lastDocument, limit, order })
    this.productCollection = this.angularFirestore.collection('products',
      (ref => ref.orderBy(order).limit(limit).startAfter(lastDocument && lastDocument.id || null)))
    return this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product))
    )
  }

  back(firstDocument: any, limit: number) {
    this.productCollection = this.angularFirestore.collection('products',
      (ref => ref.orderBy('id').limit(limit).startAfter(firstDocument && firstDocument.id || null)))
    return this.productCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Product))
    )
  }

  uploadPicture(name: string, image: any) {
    return this.angularFireStorage.ref('pictures/products/' + name).putString(image, 'data_url');
  }

  getDownloadURL(name: string) {
    return this.angularFireStorage.ref('pictures/products/' + name).getDownloadURL();
  }

  deleteProduct(product: Product) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.productCollection.doc(product.id).delete()
        await this.angularFireStorage.ref('pictures/products/' + product.nameImage ).delete()
        resolve(result)
      } catch (e: any) {
        reject(e.message)
      }
    })
  }

  updateProduct() {

  }
}
