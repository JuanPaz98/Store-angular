import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject  } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  total: number = 0;
  private myShoppingCart: Product[] = []
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable()

  constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }
  getShoppingCart() {
     return this.myShoppingCart
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum,product) => sum + product.price, 0)
  }
}
