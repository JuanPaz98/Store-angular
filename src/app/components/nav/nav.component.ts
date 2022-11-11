import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import {User, UserDTO} from '../../models/user'
import { AuthService } from '../../services/auth.service'
import { UsersService } from '../../services/users.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  profile: UserDTO | null= null
  activeMenu = false;
  counter = 0;
  

  constructor(
    private storeService: StoreService, 
    private authSvc: AuthService, 
    private userSvc: UsersService
    ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authSvc.loginAndGet('Jjfer032@gmail.com', '123458')
    .subscribe( user =>{
      this.profile = user
    })
  }

  
}
