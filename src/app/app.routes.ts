import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
