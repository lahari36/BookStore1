import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  booksArray=[];
  p:any;
  obj:any;
  username=localStorage.getItem("username")
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }
  ans=new Array();
  ngOnInit(): void {
    this.bs.getBooks().subscribe(
      res=>{
        this.booksArray=res.message;
        //console.log(this.booksArray)
        
      },
      err=>{
        //alert("something went wrong in getting books");
        this.notifierService.showNotification('something went wrong in getting books','Dismiss')
        console.log(err);
      }
      
    )
    
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }
  //Edit book
  onEdit(i){
    let bookid=this.booksArray[i].bookid;
    localStorage.setItem("bookid",bookid);
    this.router.navigateByUrl("/admin/bookedit")
  }
  //Delete book
 onDelete(i){
   let bookid=this.booksArray[i].bookid
   console.log(bookid)
   this.bs.deleteBook(bookid).subscribe(
     res=>{
       if(res.message=="book deleted"){
         this.notifierService.showNotification('Book deleted successfully','Thank You');
         window.location.reload();
       }
     },
     err=>{
       this.notifierService.showNotification('something went wrong in deleting book..','Dismiss')
       console.log(err)
     }
   )
 }
}
