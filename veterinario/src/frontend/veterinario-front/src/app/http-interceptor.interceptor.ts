import { HttpInterceptorFn } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { inject } from '@angular/core';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let jwtService = inject(JwtService);
  let token = jwtService.getTokenFromLocalStorage();
  let url = req.url;
  if (!url.endsWith('login')) {
    let cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloneReq);
  }
  return next(req);
};
