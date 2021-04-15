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
  username:string;
  spin=false;
  userid=localStorage.getItem("userid")
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }

  ngOnInit(): void {
    let userid=localStorage.getItem("userid");
    this.bs.getOrder(userid).subscribe(
      res=>{
        this.spin=true;
        this.orderArray=res.message;
        //console.log(this.orderArray)
      },
      err=>{
        alert("something went wrong in getting orders")
        console.log(err)
      }
    )
    this.getUser();
  }
  onDelete(i){
    let obj=this.orderArray[i];
    let bookid=obj.bookid
    this.bs.deleteOrder(bookid).subscribe(
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
  getUser(){
    this.bs.getUser(this.userid).subscribe(
      res=>{
        this.username=res.user.name;
        //console.log(this.username)
      },
      err=>{
        this.notifierService.showNotification('Something went wrong in getting user','Dismiss')
        console.log(err)
      }
    )
  }
}
