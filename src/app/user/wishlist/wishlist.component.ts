import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  userid=localStorage.getItem("userid");
  wishlistArray=[];
  username:string;
  
  
  booksArray=[];
  obj;
  status=false;
  price=0;
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }

  ngOnInit(): void {
    
   this.getWishlist();
    this.checkStatus();
    this.getUser();
  }
  getWishlist(){
    this.bs.getWishlist(this.userid).subscribe(
      res=>{
        this.wishlistArray=res.wishlist;
        this.booksArray=res.books
        //console.log(this.wishlistArray)
        //console.log(this.booksArray)
        this.checkStatus();
        
        
      },
      err=>{
        //alert("something went wrong in retrieving wishlist data");
        this.notifierService.showNotification('something went wrong in retrieving wishlist data','Dismiss')
        console.log(err)
      }
    )
  }
   onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }
  onCart(i){
    let cartObj=this.wishlistArray[i];
    //console.log(cartObj)
    if(cartObj.status=="available"){
      this.bs.createCart(cartObj).subscribe(
        res=>{
          if(res.message=="book added to cart successfully"){
            //alert("book added to wishlist successfully")
            this.notifierService.showNotification('book added to cart successfully','Dismiss')
           
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
    else{
      this.notifierService.showNotification('This product is not available right now','Dismiss')
    }
  }
  
  onDelete(i){
    this.obj=this.wishlistArray[i];
    let bookid=this.obj.bookid;
    //console.log(booktitle)
   this.bs.deleteWishlist(bookid).subscribe(
     res=>{
       if(res.message="book deleted successfully"){
         //alert("book deleted successfully")
         this.notifierService.showNotification('book deleted successfully','Thank You')
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
  checkStatus(){
    for(let i=0;i<this.wishlistArray.length;i++){
      
      for(let j=0;j<this.booksArray.length;j++){
        if(this.wishlistArray[i].bookid==this.booksArray[j].bookid){
          this.status=true
          this.wishlistArray[i].status="available";
          //console.log(this.wishlistArray[i].status)
          break;
        
        }
       
      }
      if(this.wishlistArray[i].status!="available"){
        this.wishlistArray[i].status="unavailable"
        
      }
    }
    //console.log(this.wishlistArray)
    for(let v=0;v<this.wishlistArray.length;v++){
      if(this.wishlistArray[v].status=="available"){
        this.price=this.price+this.wishlistArray[v].price;
      }
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
}
