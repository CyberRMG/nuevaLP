import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto, Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http = inject(HttpClient);
  private baseUrl: string = 'https://fakestoreapi.com/products';

  public getProducts(): Observable<Producto[]>{
    return this._http.get<Producto[]>(this.baseUrl);
  }

  public getProductsById(id: number): Observable<Producto>{
    return this._http.get<Producto>(this.baseUrl + `/${id}`);
  }

  public getCategories(): Observable<Category[]>{
    return this._http.get<Category[]>(`${this.baseUrl}/categories`);
  };

  public postProduct(producto: Producto): Observable<Producto>{
    return this._http.post<Producto>(this.baseUrl, producto);
  }

}
