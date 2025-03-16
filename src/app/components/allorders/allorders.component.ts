import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Iallorders } from '../../core/interfaces/iallorders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService)

  // orders: Iallorders[] = [];
  orders: WritableSignal<Iallorders[]> = signal([])

  ngOnInit(): void {
    this._OrdersService.getUserOrders().subscribe({
      next:(res)=>{
        this.orders.set(res); 
        // console.log(res);
      }
    })
  }
  
}
