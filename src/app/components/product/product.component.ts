import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../@core/services/api.service';
import { Category, Producto } from '../../@core/models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  producto: Producto[] = [];
  productList: Producto[] = [];
  categoria: Category[] = [];
  categoriaSeleccionada: string = '';

  newProduct: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)] ),
    image: new FormControl(null, Validators.required),
    category: new FormControl('', Validators.required)
  });

  private _apiService = inject(ApiService);
  private _router = inject(Router)

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  };

  getProducts(){
    this._apiService.getProducts()
    .subscribe((data: Producto[]) => {
      this.productList = data;
      console.log(data);
    });
  }

  getCategories(){
    this._apiService.getCategories().subscribe(
      data => {
        this.categoria = Object.values(data);
        console.log('cate: ', this.categoria);
        console.log(data);
      }
    );
  }

  navigate(id: number){
    this._router.navigate(['/products/', id]);
  }

  nuevoProducto() {
    const newProducto: Producto = this.newProduct.value;
    this._apiService.postProduct(newProducto)
      .subscribe({
        error: () => {
          console.log('Ha habido un error');
        },
        complete: () => {
          console.log('Exito al post');
        }
      }
    );
  };

  hasErrors(controlName: string, errorType: string){
    return this.newProduct.get(controlName)?.hasError(errorType) && this.newProduct.get(controlName)?.touched;
  }

}
