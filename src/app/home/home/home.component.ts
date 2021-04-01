import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  booksArray=[];
  
  search:string;
  author=new Array();
  newreleases=new Array();
  category=new Array();
  
  bookObj:any;
  constructor(private bs:BookService,private router:Router) { }
  
  ngOnInit(): void {
    this.bs.getBooks().subscribe(
      res=>{
        this.booksArray=res.message;
        //console.log(this.booksArray)
        
        for(let i=0;i<this.booksArray.length;i++){
          this.author.push(this.booksArray[i].author);
          this.category.push(this.booksArray[i].category)
        } 
        this.author=this.author.filter((element,i)=>i === this.author.indexOf(element)) 
        this.category=this.category.filter((element,i)=>i === this.category.indexOf(element)) 
        for(let j=20;j<this.booksArray.length;j++){
          this.newreleases.push(this.booksArray[j].booktitle)
        }
        
      },
      err=>{
        alert("something went wrong in getting books");
        console.log(err);
      }
    )
  }
  onView(i){
    this.bookObj=this.booksArray[i];
    localStorage.setItem("booktitle",this.bookObj.booktitle);
    this.router.navigateByUrl("/bookview")
  }
  onClick(j){
    localStorage.setItem("category",this.category[j])
    this.router.navigateByUrl("/category")
  }
  onCart(){
    this.router.navigateByUrl("/login")
  }
  onWish(){
    this.router.navigateByUrl("/login")
  }
}
