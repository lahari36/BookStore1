import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-bookedit',
  templateUrl: './bookedit.component.html',
  styleUrls: ['./bookedit.component.css']
})
export class BookeditComponent implements OnInit {
  
  bookimg;
  bookObj;
  bookdata;

  registerForm=new FormGroup({
    bookid:new FormControl({value:'',disabled:true}),
    booktitle:new FormControl({value:'',disabled:true}),
    author: new FormControl(''),
    publisher: new FormControl(''),
    publishedyear: new FormControl(''),
    price: new FormControl(''),
    category: new FormControl(''),
    rating: new FormControl(''),
    
    description: new FormControl('')
  });
  submitted=false;

  file :File; 

  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  }

  currentRate;
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }

  ngOnInit(): void {
    let bookid=localStorage.getItem("bookid");
    this.bs.getBook(bookid).subscribe(
      res=>{
        if(res!=null){
          this.bookObj=res;
          this.registerForm=new FormGroup({
            bookid:new FormControl(this.bookObj.bookid),
            booktitle:new FormControl(this.bookObj.booktitle),
            author:new FormControl(this.bookObj.author),
            publisher:new FormControl(this.bookObj.publisher),
            publishedyear:new FormControl(this.bookObj.publishedyear),
            category:new FormControl(this.bookObj.category),
            price:new FormControl(this.bookObj.price),
            rating:new FormControl(this.bookObj.rating),
            description:new FormControl(this.bookObj.description)
          })
          this.bookimg=this.bookObj.userImgLink;
        }
      },
      err=>{
        //alert("something went wrong in retrieving book..");
        this.notifierService.showNotification('something went wrong in retrieving book..','Dismiss')
        console.log(err);
      }
    )
    
  }
  getcontrol(){
    return this.registerForm.controls;
  }
  onSubmit(){
    this.bookdata=this.registerForm.value;
    this.bs.editBook(this.bookdata).subscribe(
      res=>{
        if(res.message=="success"){
          //alert("book updated successfully");
          this.notifierService.showNotification('book updated successfully','Dismiss')
          this.router.navigateByUrl("/admin/booklist");
        }
      },
      err=>{
        //alert("something went wrong in updating book");
        this.notifierService.showNotification('something went wrong in updating book','Dismiss')
        console.log(err)
      }
    )

  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }
}
