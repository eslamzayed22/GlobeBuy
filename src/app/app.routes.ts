import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [
    {path:'', component:AuthLayoutComponent ,canActivate:[logedGuard]  , children:[   //لو الباص فاضى ولقيت لوجن هات لوجن او لو لقيت ريجيستر
        {path:'', redirectTo:'login', pathMatch:'full'}, //لو الباص فاضى هيعمل اعاده توجية للوجين
        {path:'login', component:LoginComponent},
        {path:'register', component:RegisterComponent},
        {path:'forget', loadComponent:()=> import('./components/forgetpassword/forgetpassword.component').then((c)=> c.ForgetpasswordComponent)},
    ]},
    {path:'', component:BlankLayoutComponent  , children:[  //لو الباص فاضى ولقيت هوم هات هوم وهكذا 
        {path:'', redirectTo:'home', pathMatch:'full'}, //لو الباص فاضى هيعمل اعاده ت وجية للهوم
        {path:'home', component:HomeComponent},
        {path:'cart', loadComponent:()=> import('./components/cart/cart.component').then((c)=> c.CartComponent) ,canActivate:[authGuard]},
        {path:'wishlist', loadComponent:()=> import('./components/wishlist/wishlist.component').then((c)=> c.WishlistComponent) ,canActivate:[authGuard]},
        {path:'products', component:ProductsComponent},
        {path:'categories', loadComponent:()=> import('./components/categories/categories.component').then((c)=> c.CategoriesComponent)},
        {path:'user', loadComponent:()=> import('./components/user/user.component').then((c)=> c.UserComponent), canActivate:[authGuard]},
        {path:'about', loadComponent:()=> import('./components/about/about.component').then((c)=> c.AboutComponent) , canActivate:[authGuard]},
        {path:'details/:id', loadComponent:()=> import('./components/details/details.component').then((c)=> c.DetailsComponent)},
        {path:'allorders', loadComponent:()=> import('./components/allorders/allorders.component').then((c)=> c.AllordersComponent) , canActivate:[authGuard]},
        {path:'orders/:id', loadComponent:()=> import('./components/orders/orders.component').then((c)=> c.OrdersComponent) , canActivate:[authGuard]},
    ]},
    {path:"**", component:NotfoundComponent}
];

