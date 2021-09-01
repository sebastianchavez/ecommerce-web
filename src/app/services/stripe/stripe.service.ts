import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private url1: string = environment.apiStripe + 'orders' //post
  private url2: string = environment.apiStripe + 'orders/' //get /:id
  private url3: string = environment.apiStripe + 'orders/' //patch /:id
  private url4: string = environment.apiStripe + 'orders/confirm/' //patch /:id
  private url5: string = environment.apiStripe + 'orders/confirm-pay/' //patch /:id

  constructor(
    private http: HttpClient
  ) { }

  generateOrder(request: any): Observable<any>{
    return this.http.post(this.url1, request)
  }

  getOrderDetail(id: string): Observable<any>{
    return this.http.get(this.url2 + id)
  }

  payIntent(id: string, token: any): Observable<any>{
    return this.http.patch(this.url3 + id, {token})
  }

  confirmStatusPay(id: any): Observable<any>{
    return this.http.patch(this.url4 + id, {})
  }

  confirmPay(id: any): Observable<any>{
    return this.http.patch(this.url5 + id, {})
  }
}
