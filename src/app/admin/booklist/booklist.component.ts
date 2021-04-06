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
        for(let i=0;i<this.booksArray.length;i++){
          this.ans.push(this.booksArray[i].category)
        }
        //this.ans=this.ans.filter((element,i)=>i === this.ans.indexOf(element))
        //console.log(this.ans)
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
  onEdit(i){
    let booktitle=this.booksArray[i].booktitle;
    localStorage.setItem("booktitle",booktitle);
    this.router.navigateByUrl("/admin/bookedit")
  }
  onDelete(i){
    this.obj=this.booksArray[i];
    let booktitle=this.obj.booktitle;
    //console.log(booktitle);
    this.bs.deleteBook(booktitle).subscribe(
      res=>{
        if(res.message=="book deleted"){
          //alert("book deleted successfully")
          this.notifierService.showNotification('book deleted successfully','Thank You')
          window.location.reload();
        }
      },
      err=>{
        //alert("something went wrong in book deletion")
        this.notifierService.showNotification('something went wrong in book deletion','Dismiss')
        console.log(err)
      }
    )
  }
}
