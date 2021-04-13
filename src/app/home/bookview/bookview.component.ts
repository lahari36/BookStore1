import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-bookview',
  templateUrl: './bookview.component.html',
  styleUrls: ['./bookview.component.css']
})
export class BookviewComponent implements OnInit {
  bookObj;
  username=localStorage.getItem("username");
  //inject services
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }

  ngOnInit(): void {
    
  let bookid=localStorage.getItem("bookid");
  this.bs.getBook(bookid).subscribe(
    res=>{
      this.bookObj=res;
    },
    err=>{
      this.notifierService.showNotification('Something went wrong in getting book','Dismiss')
      console.log(err)
    }
  )
}
onAdd(){
  if(this.username!=null){
    this.router.navigateByUrl("/userdashboard")
  }
  else{
    this.router.navigateByUrl("/login")
  }
  
}

}

