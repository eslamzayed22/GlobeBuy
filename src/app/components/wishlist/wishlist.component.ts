import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [TranslateModule, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {

  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)

  wishlistDetails: Iwishlist[] = [];
  private getAllWishlistItem!: Subscription;

  ngOnInit(): void {
    this.getAllWishlistItems();
  }

  
  ngOnDestroy(): void {
    if (this.getAllWishlistItem) {
      this.getAllWishlistItem.unsubscribe();
    }
  }
  getAllWishlistItems(): void {
    this.getAllWishlistItem = this._WishlistService.getProductsWishlist().subscribe({
      next: (res) => {
        this.wishlistDetails = res.data;
      }
    });
  }

  removeWishItem(id: string): void {
    this._WishlistService.deleteSpecificItem(id).subscribe({
      next: (res) => {
        // console.log(res);
        this._ToastrService.warning('Item removed from wishlist');
        this.getAllWishlistItems(); 
        this._WishlistService.wishNumber.set(res.data.length)
      }
    });
  }
  addCart(id:string): void {
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this._ToastrService.success(res.message)
        this._CartService.cartNumber.set(res.numOfCartItems)
      }
    })
  }
}
