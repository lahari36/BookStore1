import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderArray=[];
  username=localStorage.getItem("username")
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }

  ngOnInit(): void {
    let username=localStorage.getItem("username");
    this.bs.getOrder(username).subscribe(
      res=>{
        this.orderArray=res.message;
        //console.log(this.orderArray)
      },
      err=>{
        alert("something went wrong in getting orders")
        console.log(err)
      }
    )
  }
  onDelete(i){
    let obj=this.orderArray[i];
    let booktitle=obj.booktitle
    this.bs.deleteOrder(booktitle).subscribe(
      res=>{
        if(res.message="book returned successfully"){
          //alert("Book returned successfully")
          this.notifierService.showNotification('Book returned successfully','Thank You')
          window.location.reload();
        }
      },
      err=>{
        alert("something went wrong in returning order")
        console.log(err)
      }
    )
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }
}
