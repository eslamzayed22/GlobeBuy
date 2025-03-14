import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient)
  
  cartNumber : BehaviorSubject<number> = new BehaviorSubject(0)

  addToCart(id:string):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {"productId": id}) 
  }

  getProductsCart():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`) 
  }

  deleteSpecificItem(id:string):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`) 
  }
  updateProductQuantity(id:string, newCount:number):Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {"count": newCount}) 
  }
  clearCart():Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`) 
  }
  
}
