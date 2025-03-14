import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly _HttpClient = inject(HttpClient)

  usertoken : any = null

  checkOut(idCart:string | null, shippingDetails:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`,
      {
        "shippingAddress": shippingDetails
      })
  }
  getUserOrders():Observable<any> {
    this.usertoken = jwtDecode(localStorage.getItem('userToken')!)
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this.usertoken.id}`)
  }
}
