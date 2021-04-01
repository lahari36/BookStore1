import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-bookview',
  templateUrl: './bookview.component.html',
  styleUrls: ['./bookview.component.css']
})
export class BookviewComponent implements OnInit {
  bookObj:any;
  constructor(private bs:BookService,private router:Router) { }

  ngOnInit(): void {let booktitle=localStorage.getItem("booktitle")
  console.log(booktitle)
  this.bs.getBook(booktitle).subscribe(
    res=>{
      this.bookObj=res;
      //console.log(this.bookObj)
    },
    err=>{
      alert("something went wrong in book retrieval");
      console.log(err)
    }
  )
  
}
onAdd(){
  this.router.navigateByUrl("/login")
}

}

