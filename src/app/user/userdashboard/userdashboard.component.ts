import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  booksArray=[];
  search:string;
  username=localStorage.getItem("username");
  constructor(private router:Router,private bs:BookService) { }

  ngOnInit(): void {
    this.bs.getBooks().subscribe(
      res=>{
        this.booksArray=res.message;
        //console.log(this.booksArray)
        
        
      },
      err=>{
        alert("something went wrong in getting books");
        console.log(err);
      }
    )
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }
}
