import { Injectable } from '@angular/core';
import { Category } from '../../models/category.interface';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection: AngularFirestoreCollection<Category>; 
  constructor(
    private angularFirestore: AngularFirestore,
  ) {
    this.categoryCollection = angularFirestore.collection<Category>('categories')  
  }

  saveCategory(category:Category): Promise<any>{
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.angularFirestore.createId();
        const data = { ...category, id };
        const result = await this.categoryCollection.doc(id).set(data);
        resolve(result)
      } catch (e) {
        reject(e.message)
      }
    })
  }

  searchCategory(filters: any): Observable<any>{
    let queryFn: QueryFn = (ref => ref)
    if (filters.name != '') {
      queryFn = (ref => ref.orderBy('name').startAt(filters.name).endAt(filters.name + '\uf8ff').limit(filters.limit))
    } 
    this.categoryCollection = this.angularFirestore.collection<Category>('categories', queryFn)
    return this.categoryCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Category))
    )
  }

  deleteCategory(category: Category){
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.categoryCollection.doc(category.id).delete()
        resolve(result)
      } catch (e) {
        reject(e.message)
      }
    })
  }
}
