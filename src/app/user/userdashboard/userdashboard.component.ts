import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  booksArray=[];
  search:string;
  wishlistObj;
  cartObj;
  orderObj;
  wishlistArray=[];
  orderArray=[];
  cartArray=[];
  wishlistcount:number;
  ordercount:number;
  cartcount:number;
  bookcost:number;
  cost:number;
  username:string;
  userid=localStorage.getItem("userid");
  constructor(private router:Router,private bs:BookService,private notifierService:NotifierService) { }

  ngOnInit(): void {
    this.bs.getBooks().subscribe(
      res=>{
        this.booksArray=res.message;
       
      },
      err=>{
        //alert("something went wrong in getting books");
        this.notifierService.showNotification('something went wrong in getting books','Dismiss')
        console.log(err);
      }
    )
    this.wishlistStatus();
    this.orderStatus();
    this.cartStatus();
    this.getUser();
  }
  
  onWishlist(i){
    let userid=localStorage.getItem("userid");
    if(userid!=null){
      this.wishlistObj={
        userid:userid,
        bookid:this.booksArray[i].bookid,
        booktitle:this.booksArray[i].booktitle,
        author:this.booksArray[i].author,
        publisher:this.booksArray[i].publisher,
        publishedyear:this.booksArray[i].publishedyear,
        category:this.booksArray[i].category,
        price:this.booksArray[i].price,
        rating:this.booksArray[i].rating,
        description:this.booksArray[i].description,
        ImgLink:this.booksArray[i].userImgLink,
        quantity:1
      }
      
    }
    this.bs.createWishlist(this.wishlistObj).subscribe(
      res=>{
        if(res.message=="book added to wishlist successfully"){
          //alert("book added to wishlist successfully")
          this.notifierService.showNotification('book added to wishlist successfully','Dismiss')
          this.wishlistStatus();
        }
        else if(res.message=="book already existed in wishlist"){
          //alert("book already existed in wishlist")
          this.notifierService.showNotification('book already existed in wishlist','Dismiss')
        }
      },
      err=>{
        //alert("something went wrong in creating wishlist");
        this.notifierService.showNotification('something went wrong in creating wishlist','Dismiss')
        console.log(err)
      }
    )
  }
  onCart(i){
    if(this.userid!=null){
      this.cartObj={
        userid:this.userid,
        bookid:this.booksArray[i].bookid,
        booktitle:this.booksArray[i].booktitle,
        author:this.booksArray[i].author,
        publisher:this.booksArray[i].publisher,
        publishedyear:this.booksArray[i].publishedyear,
        category:this.booksArray[i].category,
        price:this.booksArray[i].price,
        rating:this.booksArray[i].rating,
        description:this.booksArray[i].description,
        ImgLink:this.booksArray[i].userImgLink,
        quantity:1
      }
    }
    //console.log(this.cartObj)
    this.bs.createCart(this.cartObj).subscribe(
      res=>{
        if(res.message=="book added to cart successfully"){
          //alert("book added to wishlist successfully")
          this.notifierService.showNotification('book added to cart successfully','Dismiss')
          this.cartStatus();
        }
        else if(res.message=="book already existed in cart"){
          //alert("book already existed in wishlist")
          this.notifierService.showNotification('book already existed in cart','Dismiss')
        }
      },
      err=>{
        //alert("something went wrong in creating wishlist");
        this.notifierService.showNotification('something went wrong in creating cart','Dismiss')
        console.log(err)
      }
    )
  }
  onBuy(i){
    if(this.userid!=null){
      this.orderObj={
        userid:this.userid,
        bookid:this.booksArray[i].bookid,
        booktitle:this.booksArray[i].booktitle,
        author:this.booksArray[i].author,
        publisher:this.booksArray[i].publisher,
        publishedyear:this.booksArray[i].publishedyear,
        category:this.booksArray[i].category,
        price:this.booksArray[i].price,
        rating:this.booksArray[i].rating,
        description:this.booksArray[i].description,
        ImgLink:this.booksArray[i].userImgLink,
        quantity:1
      }
    }
    //console.log(this.orderObj)
    this.cost=this.orderObj.price+50;
    this.bookcost=this.orderObj.price;
    this.bs.createOrder(this.orderObj).subscribe(
      res=>{
        if(res.message=="book purchased successfully"){
          //alert("Book purchased")
          this.notifierService.showNotification('Payment successfull','Thank You')
          this.orderStatus();
        }
      },
      err=>{
        //alert("something went wrong in buying product");
        this.notifierService.showNotification('something went wrong in buying product','Dismiss')
        console.log(err)
      }
    )
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }
  wishlistStatus(){
    this.bs.getWishlist(this.userid).subscribe(
      res=>{
        this.wishlistArray=res.wishlist;
        //console.log(this.wishlistArray)
        this.wishlistcount=this.wishlistArray.length;
        //console.log(this.wishlistcount)
      },
      err=>{
        //alert("something went wrong in retrieving wishlist data");
        this.notifierService.showNotification('something went wrong in retrieving wishlist data','Dismiss')
        console.log(err)
      }
    )
  }
  orderStatus(){
    this.bs.getOrder(this.userid).subscribe(
      res=>{
        this.orderArray=res.message;
        //console.log(this.orderArray)
        this.ordercount=this.orderArray.length
      },
      err=>{
        //alert("something went wrong in getting orders")
        this.notifierService.showNotification('something went wrong in getting orders','Dismiss')
        console.log(err)
      }
    )
  }
  cartStatus(){
    this.bs.getCart(this.userid).subscribe(
      res=>{
        this.cartArray=res.cart;
        //console.log(this.cartArray)
        this.cartcount=this.cartArray.length;
      },
      err=>{
        this.notifierService.showNotification('something went wrong in getting cart data','Dismiss')
        console.log(err)
      }
    )
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
