import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchPipe } from '../search.pipe';
import { CategoryComponent } from './category/category.component';
import { BookviewComponent } from './bookview/bookview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  declarations: [HomeComponent,
  SearchPipe,
  CategoryComponent,
  BookviewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
