import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { Search1Pipe } from '../search1.pipe'


@NgModule({
  declarations: [RegisterComponent, UserdashboardComponent, Search1Pipe],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class UserModule { }
