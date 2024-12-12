import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProductCreatePageComponent } from './pages/admin/products/product-create-page/product-create-page.component';
import { AdminPageComponent } from './pages/admin/admin-page/admin-page.component';
import { ProductIndexPageComponent } from './pages/admin/products/product-index-page/product-index-page.component';
import { GuardService } from './data/services/guard.service';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const routes: Routes = [
    {path: 'admin', canActivate: [GuardService], component: AdminPageComponent, children: [
        {path: 'products', component: ProductIndexPageComponent},
        {path: 'products/create', component: ProductCreatePageComponent}
    ]},
    {path: '', component: MainPageComponent},
    {path: 'login', component: LoginPageComponent}, 
    {path: 'register', component: RegisterPageComponent}, 
    {path: 'cart/:id', component: CartPageComponent},
];
