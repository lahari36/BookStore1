import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '../route.guard';

import { BookviewComponent } from './bookview/bookview.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:"category",component:CategoryComponent},
  {path:"bookview",component:BookviewComponent},
  {path:"home",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
