import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokensVc: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request)
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>){
    const token = this.tokensVc.getToken()
    if(token){
      const authRequ = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      return authRequ
    }
    return request
  }
}
