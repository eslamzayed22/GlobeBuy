import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // مراقبة كل التنقلات في الموقع
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeOffcanvas(); 
      }
    });
  }

  //function to close navbar when navigate
  private closeOffcanvas(): void {
    setTimeout(() => {
      const closeButton = document.querySelector('.btn-close');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
    }, 300);
  }
}
