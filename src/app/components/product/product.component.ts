import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../@core/services/api.service';
import { Producto } from '../../@core/models/product.model';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  productList: Producto[] = [];

  private _apiService = inject(ApiService);
  private _router = inject(Router)

  ngOnInit(): void {
    this._apiService.getProducts()
    .subscribe((data: Producto[]) => {
      console.log(data);
      this.productList = data;
    });
  };

  navigate(id: number){
    this._router.navigate(['/products/', id]);
  }

}
