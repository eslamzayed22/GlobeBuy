import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, CurrencyPipe , TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _CartService = inject(CartService)
    private readonly _WishlistService = inject(WishlistService)
  
  private readonly _ToastrService = inject(ToastrService)
  
  productList : WritableSignal<IProduct[]> = signal([])
  categoryList : WritableSignal<ICategory[]> = signal([])
  wishlistData : WritableSignal<string[]> = signal([])

  getAllProductSub !: Subscription
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1500,
    autoplayHoverPause: true,
    rtl:true,
  }

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    rtl:true,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  ngOnInit(): void {
    // show Loading screen 
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList.set( res.data);
        // console.log(res.data);
      }
    })
    this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.productList.set(res.data); 
      }
    })
    this._WishlistService.getProductsWishlist().subscribe({
      next:(res)=>{
        // console.log(res);
        this.wishlistData.set( res.data.map((product:any)=>product._id));
      }
    })
  }
  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
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

  addToWishlist(id:string):void {
    this._WishlistService.addToWishlist(id).subscribe ({
      next:(res)=>{
        console.log(res.data.length);
        this._ToastrService.success(res.message)
        this.wishlistData.set(res.data);
        this._WishlistService.wishNumber.set(res.data.length)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  removeFromWishlist(id:string){
    this._WishlistService.deleteSpecificItem(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.wishlistData.set(res.data);
        this._ToastrService.warning('Item removed from wishlist');
        this._WishlistService.wishNumber.set(res.data.length)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
