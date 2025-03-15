import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _HttpClient = inject(HttpClient)

    // wishNumber : BehaviorSubject<number> = new BehaviorSubject(0)
      // Or ↓↓↓
    wishNumber : WritableSignal<number> =signal(0)
    
  
    
  addToWishlist(id:string):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {"productId": id},
      
    ) 
  }

  getProductsWishlist():Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,
    ) 
  }

  deleteSpecificItem(id:string):Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
      
    ) 
  }
}
