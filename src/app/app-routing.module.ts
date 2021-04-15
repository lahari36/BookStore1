import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';




const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  
  
  {path:"",redirectTo:"/home",pathMatch:"full"},
  { path:"login",component:LoginComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

