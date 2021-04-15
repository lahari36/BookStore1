import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { RouteGuard } from '../route.guard';
import { AddbookComponent } from './addbook/addbook.component';
import { AdminComponent } from './admin.component';
import { BookeditComponent } from './bookedit/bookedit.component';
import { BooklistComponent } from './booklist/booklist.component';
import { RegisterComponent } from './register/register.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  
  {path:"register",component:RegisterComponent},
  {path:"addbook",component:AddbookComponent,canActivate:[RouteGuard]},
  {path:"booklist",component:BooklistComponent,canActivate:[RouteGuard]},
  {path:"userlist",component:UserlistComponent,canActivate:[RouteGuard]},
  {path:"bookedit",component:BookeditComponent,canActivate:[RouteGuard]},
  { path:'**',component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
