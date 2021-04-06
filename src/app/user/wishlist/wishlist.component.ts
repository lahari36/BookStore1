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
  username=localStorage.getItem("username");
  wishlistArray=[];

  list=[];
  
  booksArray=[];
  obj;
  status="unavailable"
  price=0;
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }

  ngOnInit(): void {
    this.bs.getBooks().subscribe(
      res=>{
        this.booksArray=res.message;
        //console.log(this.booksArray)
      },
      err=>{
        //alert("something went wrong in getting books data");
        this.notifierService.showNotification('something went wrong in getting books data','Dismiss')
        console.log(err)
      }
    )
    this.bs.getWishlist(this.username).subscribe(
      res=>{
        this.wishlistArray=res.message;
        //console.log(this.wishlistArray)
        for(let i=0;i<this.wishlistArray.length;i++){
          this.price=this.price+this.wishlistArray[i].price;
          for(let j=0;j<this.booksArray.length;j++){
            if(this.wishlistArray[i].booktitle==this.booksArray[j].booktitle){
            
             this.list.push(i)
            
            }
            else{
              
            }
          }
        }
        //console.log(this.list)
        
        
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
  
  onDelete(i){
    this.obj=this.wishlistArray[i];
    let booktitle=this.obj.booktitle;
    //console.log(booktitle)
   this.bs.deleteWishlist(booktitle).subscribe(
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
        if(this.wishlistArray[i].booktitle==this.booksArray[j].booktitle){
          console.log("true")
        }
        else{
          console.log("false")
        }
      }
    }
  }
  
}
