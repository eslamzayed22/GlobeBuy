import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _ProductsService =inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  
  
  detalisProduct: IProduct = {} as IProduct;
  selectedImage: string | null = null;


  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(p) => {
          let idProduct = p.get('id');
          
          this._ProductsService.getSpecificProduct(idProduct).subscribe({
            next:(res)=> {
              this.detalisProduct = res.data;
              // console.log(res.data);
              
            },
            error:(err)=>{
              console.log(err);
              
            }
          })
        }
      })
  }
  addCart(id:string): void {
    this._CartService.addToCart(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this._ToastrService.success(res.message)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}

