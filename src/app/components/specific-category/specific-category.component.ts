import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent {
  private readonly _ProductsService = inject(ProductsService);
  
}
