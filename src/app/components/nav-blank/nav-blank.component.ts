import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLinkActive,RouterLink , FormsModule , TranslateModule ],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
  animations: [
    trigger('slideFadeDown', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }), // يبدأ من الأعلى وغير مرئي
        animate('1s ease-out', style({ transform: 'translateY(0)', opacity: 1 })) // يتحرك للأسفل ويصبح مرئيًا
      ])
    ])
  ]
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _Router= inject(Router)
  
  searchText : string = "";
  countCartNumber : Signal<number> = computed(()=> this._CartService.cartNumber())

  countWishNumber : Signal<number> = computed(()=> this._WishlistService.wishNumber())

  ngOnInit(): void {
      // cart count number
    this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        // console.log(res)
        this._CartService.cartNumber.set(res.numOfCartItems) 
      }
    })
    // this._CartService.cartNumber.subscribe({      //delete this because we use signals
    //     next:(data)=>{
    //       this.countCartNumber = data;
    //     }
    //   }) 
      // wishlist count number
    this._WishlistService.getProductsWishlist().subscribe({
      next:(res)=>{
        // console.log(res)
        this._WishlistService.wishNumber.set(res.data.length) 
      }
    })
    // this._WishlistService.wishNumber.subscribe({               //delete this because we use signals
    //     next:(data)=>{
    //       this.countWishNumber = data;
    //     }
    //   }) 
  }

  search() {
    if (this.searchText.trim()) {
      this._Router.navigate(['/products'], { queryParams: { search: this.searchText } });
    }
  }
  
}
