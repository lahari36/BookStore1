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
  username=localStorage.getItem("username");
  cartArray=[];
  bookdetails;
  total: any;
  amount:number;
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService ) { }

  ngOnInit(): void {
    this.bs.getCart(this.username).subscribe(
      res=>{
        this.cartArray=res.message
        //console.log(this.cartArray)
        for(let i=0;i<this.cartArray.length;i++){
          this.amount=this.amount+this.cartArray[i].price
        }
      },
      err=>{
        this.notifierService.showNotification('something went wrong in cart','Dismiss')
        console.log(err)
      }
    )
    this.totalamount();
  }
  increment(b){
    if(b.quantity){
      let price=b.price/b.quantity;
    b.quantity+=1;

    b.price=b.quantity*price;
    this.totalamount();
    }

  }
  decrement(b){
    if(b.quantity!=1){
      let price=b.price/b.quantity;
      b.quantity-=1;
      
      b.price=b.quantity*price;
      this.totalamount();
      }
  
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
  onRemove(i){
    let obj=this.cartArray[i];
    let booktitle=obj.booktitle;
    this.bs.deleteCart(booktitle).subscribe(
      res=>{
        if(res.message="book deleted from cart successfully"){
          //alert("book deleted successfully")
          this.notifierService.showNotification('book deleted from cart successfully','Thank You')
          window. location. reload ();
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

}
