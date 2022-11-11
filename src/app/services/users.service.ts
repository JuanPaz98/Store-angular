import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserDTO } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'https://young-sands-07814.herokuapp.com/api/users/'

  constructor(private http: HttpClient) { }

  createUser(user: UserDTO){
    return this.http.post<User>(this.url, user)
  }

  getUsers(){
    return this.http.get<User[]>(this.url)
  }

  deleteUser(id: number){
    return this.http.delete<boolean>(`${this.url}` + id)
  }

}
