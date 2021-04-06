import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(displayMessage:string,buttonText: string){
    this.snackBar.open(displayMessage,buttonText,{
      duration:2000,
      horizontalPosition:'center',
      verticalPosition:'top',
    })
  }
}
