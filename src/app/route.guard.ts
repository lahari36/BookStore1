import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {NotifierService} from './notifier.service'

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private notifierservice:NotifierService){}
  canActivate():boolean{
    //check token in local storage
    let token=localStorage.getItem("token")
    //if token is not found return true
    if(token==undefined){
      //alert("Unauthorized access")
      this.notifierservice.showNotification('Unauthorized access','Dismiss')
      return false;
    }
    //else return true
    return true;
  }
  
}

