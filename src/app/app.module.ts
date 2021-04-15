import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {HomeModule} from './home/home.module'
import {UserModule} from './user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationService } from './authorization.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HomeModule,
    UserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthorizationService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
