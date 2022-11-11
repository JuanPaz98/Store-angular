import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Product, createProductDTO, UpdateProductDTO } from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  url = 'https://young-sands-07814.herokuapp.com/api/products/'

  constructor(private http: HttpClient) { }

  getByCategoryId(categoryId: string, limit?: number, offset?: number){

  }

  getAllProducts( ) {
    return this.http.get<Product[]>(this.url)
  } 
  getSingleProduct(id: string){
    return this.http.get<Product>(this.url + id)
    
  }

  getProductByPage(limit: number, offset: number){
    return this.http.get<Product[]>(this.url,{
      params: {limit, offset}
    })
  }

  create(dto: createProductDTO){
    return this.http.post<Product>(this.url, dto)
  }
  update(id: string, dto: UpdateProductDTO){ 
    return this.http.put<Product>(this.url + id, dto) 
  }
  delete(id: string){
    return this.http.delete<boolean>(this.url + id)
  }
}
