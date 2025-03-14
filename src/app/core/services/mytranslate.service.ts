import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MytranslateService {
  private readonly _TranslateService = inject(TranslateService)
  private readonly _platId = inject(PLATFORM_ID)
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(null , null)
  //use RendererFactory2 and make instance to renderer2 by this way  ^^^  there are error when use renderer directly in service

  constructor() {
    if(isPlatformBrowser(this._platId)){
      // Browser
    // this language will be used as a fallback when a translation isn't found in the current language this._TranslateService.setDefaultLang(  'en'  );
    //1- set default lang
      this._TranslateService.setDefaultLang('en');
      //2- get lang from localStorage
      //3- use language if found
      //to change direction
      this.setLang();
    }
  }

  setLang(): void {
    const savedLang = localStorage.getItem('lang');
      //3- use language if found
    if(savedLang !== null){
        this._TranslateService.use(savedLang);
      }
      //change direction
    if (savedLang === 'en') {
      // dir ltr
      // document.documentElement.dir = 'ltr';
      this._Renderer2.setAttribute(document.documentElement, 'dir' , 'ltr' )
      this._Renderer2.setAttribute(document.documentElement, 'lang' , 'en' )
    } else if (savedLang === 'ar') {
      //dir rtl
      // document.documentElement.dir = 'rtl';
      this._Renderer2.setAttribute(document.documentElement, 'dir' , 'rtl' )
      this._Renderer2.setAttribute(document.documentElement, 'lang' , 'ar' )
    }
  }

  changeLang(lang: string): void {
    if (isPlatformBrowser(this._platId)) {
      localStorage.setItem('lang', lang);
      this.setLang();
    }
  }
}
