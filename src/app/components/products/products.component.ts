import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, createProductDTO, UpdateProductDTO } from '../../models/product.model'

import { StoreService } from '../../services/store.service'
import { ApiProductsService } from '../../services/api-products.service'
import { Controller } from 'swiper';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = []
  total: number = 0;
  showProduct: boolean = false;
  @Input() products:Product[] = [ ];
  @Output() loading: EventEmitter<string> = new EventEmitter();
  productChosen: Product = {
    id: '',
    title: '',
    price: 0, 
    images: [], 
    description: '',
    category: {
      id: '', 
      name: '',  
    }
  }
 
  constructor(private storeService: StoreService,
    private apiProducts : ApiProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart()
  }
  
  onAddToShoppingCart(product: Product): void {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal()
    console.log(product);
  }

  toggleProductDetail(){
    this.showProduct = !this.showProduct
  }
  onDetailProduct(id: string){
    this.apiProducts.getSingleProduct(id)
    .subscribe(data =>{
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }
  createNewProduct(){
    const product: createProductDTO = {
      title: "producto nuevo",
      price: 1000,
      images: ['https://placeimg.com/640/480/any'], 
      description: "epa la arepa",
      categoryId: 2,
    }
    this.apiProducts.create(product)
    .subscribe(data =>{
      this.products.unshift(data)
    })
  }

  updateProduct(){
    const changes : UpdateProductDTO = {
      title: "nuevo title"
    }
    const id = this.productChosen.id
    this.apiProducts.update(id, changes)
    .subscribe(data =>{
      const productIndex = this.products.findIndex(
        item =>item.id ==this.productChosen.id
      )
      this.products[productIndex] = data
      this.productChosen = data
    })
  }
  deleteProduct(){
    const id = this.productChosen.id
    this.apiProducts.delete(id)
    .subscribe(() =>{
      const productIndex = this.products.findIndex(
        item =>item.id ==this.productChosen.id
      )
      this.products.splice(productIndex, 1)
      this.toggleProductDetail()
    })
  }
  
  loadMore() {    
    this.loading.emit()
  }
 
}
