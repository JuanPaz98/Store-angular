import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { Auth } from '../models/auth.model';
import { User } from '../models/user';
import { TokenService } from '../services/token.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://young-sands-07814.herokuapp.com/api/auth'
  constructor(private http: HttpClient, private tokenSvc: TokenService) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.url}/login`, { email, password })
    .pipe(
      tap(response => this.tokenSvc.saveToken(response.access_token))
    )
  }
  profile(){
    return this.http.get<User>(`${this.url}/profile`)
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.profile()),
    )
  }
}
