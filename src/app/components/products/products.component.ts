import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, SearchPipe , TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  
  
  productList: IProduct[] = [];
  wishlistData:string[]=[]
  getAllProductSub!: Subscription;
  searchQuery: string = '';

  ngOnInit(): void {
    this.getAllProductSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      }
    });
    this._WishlistService.getProductsWishlist().subscribe({
      next:(res)=>{
        // console.log(res);
        this.wishlistData = res.data.map((product:any)=>product._id)
      }
    })
    //  queryParams قراءة قيمة البحث من الـ
    this._route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
    });
  }

  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe();
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
        // console.log(res);
        this._ToastrService.success(res.message)
        this.wishlistData =res.data
        this._WishlistService.wishNumber.set(res.data.length)
      }
    })
  }
  removeFromWishlist(id:string){
    this._WishlistService.deleteSpecificItem(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.wishlistData =res.data
        this._ToastrService.warning('Item removed from wishlist');
        this._WishlistService.wishNumber.set(res.data.length)
      }
    })
  }
}
