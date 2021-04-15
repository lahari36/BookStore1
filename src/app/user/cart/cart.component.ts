import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userid=localStorage.getItem("userid");
  cartArray=[];
  booksArray=[];
  bookdetails;
  username:string;
  total: any;
  status=false;
  amount:number;
  cost:number;
  bookcost:number;
  spin=false;
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService ) { }

  ngOnInit(): void {
    
    this.getCart();
    this.checkStatus();
    this.totalamount();
    this.getUser();
   
  }
  getCart(){
    this.bs.getCart(this.userid).subscribe(
      res=>{
        this.spin=true;
        this.cartArray=res.cart
        this.booksArray=res.books
        //console.log(this.cartArray)
        //console.log(this.booksArray)
        this.checkStatus();
        
      },
      err=>{
        this.notifierService.showNotification('something went wrong in cart','Dismiss')
        console.log(err)
      }
    )
  }
  increment(b){
    if(b.quantity&&b.status=="available"){
      let price=b.price/b.quantity;
      b.quantity+=1;
      b.price=b.quantity*price;
      this.totalamount();
    }

  }
  decrement(b){
    if(b.quantity>1){
      let price=b.price/b.quantity;
      b.quantity-=1;
      
      b.price=b.quantity*price;
      this.totalamount();
    }
  
  }
  checkStatus(){
    for(let i=0;i<this.cartArray.length;i++){
     
      for(let j=0;j<this.booksArray.length;j++){
        if(this.cartArray[i].bookid==this.booksArray[j].bookid){
          this.status=true
          this.cartArray[i].status="available"
          //console.log(this.cartArray[i].status)
          break;
        }
       
      }
      if(this.cartArray[i].status!="available"){
        this.cartArray[i].status="unavailable"
      }
    }
    for(let v=0;v<this.cartArray.length;v++){
      if(this.cartArray[v].status=="available"){
        this.amount=this.amount+this.cartArray[v].price;
      }
    }
    //console.log(this.cartArray)
  }
  totalamount(){
    this.amount=0;
        for(let i=0;i<this.cartArray.length;i++){
          let price=this.cartArray[i].price/this.cartArray[i].quantity;
          this.amount+=price*this.cartArray[i].quantity

         //console.log("the cart price",this.cart[i].price)
        }
  }
  
  onBuy(i){
    let orderObj=this.cartArray[i]
   
    if(orderObj.status=="available"){
      this.cost=orderObj.price+50;
      this.bookcost=orderObj.price
      this.bs.createOrder(orderObj).subscribe(
        res=>{
          if(res.message=="book purchased successfully"){
            //alert("Book purchased")
            this.notifierService.showNotification('Payment successfull','Thank You');
            this.onRemove(i);
          }
        },
        err=>{
          //alert("something went wrong in buying product");
          this.notifierService.showNotification('something went wrong in buying product','Dismiss')
          console.log(err)
        }
      )
    }
    else{
      this.notifierService.showNotification('This book is not available right now','Dismiss')
    }
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
  onRemove(i){
    let obj=this.cartArray[i];
    let bookid=obj.bookid;
    this.bs.deleteCart(bookid).subscribe(
      res=>{
        if(res.message="book deleted from cart successfully"){
          //alert("book deleted successfully")
          this.notifierService.showNotification('book deleted from cart successfully','Thank You')
          //window. location. reload ();
        }
      },
      err=>{
        //alert("something went wrong in deleting  book")
        this.notifierService.showNotification('something went wrong in deleting  book','Dismiss')
        console.log(err)
      }
    )
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }
  onClose(){
    window.location.reload();
  }
}
