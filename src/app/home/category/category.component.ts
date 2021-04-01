import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  categoryArray=[];
  bookObj:any;
  constructor(private bs:BookService,private router:Router) { }

  ngOnInit(): void {
    let category=localStorage.getItem("category")
    this.bs.getBooks1(category).subscribe(
      res=>{
        this.categoryArray=res.message;
        //console.log(this.categoryArray);
      },
      err=>{
        alert("something went wrong in retrieving data...")
        console.log(err)
      }
    )
  }
  onView(i){
    this.bookObj=this.categoryArray[i];
    localStorage.setItem("booktitle",this.bookObj.booktitle);
    this.router.navigateByUrl("/bookview")
  }
  onCart(){
    this.router.navigateByUrl("/login")
  }
  onWish(){
    this.router.navigateByUrl("/login")
  }
}
