import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService)
  
    categoryList : WritableSignal<ICategory[]> = signal([])
  
  getAllProductSub !: Subscription
  
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList.set( res.data);
        // console.log(res.data);
      }
    })
  }
  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
  }

  
}
