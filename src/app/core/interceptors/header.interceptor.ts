import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (typeof window !== 'undefined' && window.localStorage) {
    const userToken = localStorage.getItem('userToken');
    // console.log('userToken:', userToken);
    
    if (userToken !== null) {
      if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) {
        req = req.clone({
          setHeaders: { token : userToken }
        });
      }
    }
  }

  return next(req);
};
