import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../@core/services/api.service';
import { Producto } from '../../@core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  loading: boolean = true;
  public product?: Producto;

  private _routerActive = inject(ActivatedRoute);
  private _apiService = inject(ApiService);

  ngOnInit(): void {
    this._routerActive.params.subscribe(
      params => {
        this._apiService.getProductsById(params['id'])
        .subscribe((data: Producto) => {
          console.log(data);
          this.product = data;
          this.loading = false;
        });
      }
    );
  };

}
