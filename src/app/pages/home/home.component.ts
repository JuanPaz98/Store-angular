import { Component, OnInit } from '@angular/core';
import { Product, createProductDTO, UpdateProductDTO } from '../../models/product.model'
import { ApiProductsService } from '../../services/api-products.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:Product[] = [ ];
  limit = 10;
  offset = 0
  constructor( private apiProducts: ApiProductsService) { }

  ngOnInit(): void {
    this.apiProducts.getProductByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = data
    })
  }
  loadMore(){
    this.apiProducts.getProductByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
    })
  }
  

}
