import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RouteGuard } from '../route.guard';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"userdashboard",component:UserdashboardComponent,canActivate:[RouteGuard]},
    {path:"cart",component:CartComponent,canActivate:[RouteGuard]},
    {path:"wishlist",component:WishlistComponent,canActivate:[RouteGuard]},
    {path:"orders",component:OrdersComponent,canActivate:[RouteGuard]},
    { path:'**',component:PageNotFoundComponent }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
