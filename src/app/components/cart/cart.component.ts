import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService)
  
  cartDetails : Icart = {} as Icart

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        this.cartDetails = res.data
        // console.log(res.data);
      }
    })
  }

  updateCount(id:string , count:number) :void {
    this._CartService.updateProductQuantity(id , count).subscribe({
      next:(res)=>{
        this.cartDetails = res.data
        console.log(res);
        this._CartService.cartNumber.set(res.numOfCartItems)
      }
    })
  }

  clearUserCart():void {
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message == "success"){
          this.cartDetails = {} as Icart;
        this._CartService.cartNumber.set(0)
        }
      }
    })
  }
}
