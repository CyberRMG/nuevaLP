import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http = inject(HttpClient);
  private baseUrl: string = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Producto[]>{
    return this._http.get<Producto[]>(this.baseUrl);
  }

  getProductsById(id: number): Observable<Producto>{
    return this._http.get<Producto>(this.baseUrl + `/${id}`);
  }

}
