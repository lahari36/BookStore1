import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  file:File; 
  length:number;
  username=localStorage.getItem("username")
  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  } 
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }
  ngOnInit(): void {
    this.bs.getBooks().subscribe(
      res=>{
        this.length=res.message.length;
        //console.log(this.length)
      },
      err=>{
        this.notifierService.showNotification('Something went wrong in getting data','Dismiss')
      }
    )
  }
  onSubmit(formRef){
    let Obj=formRef.value;
    let booksObj={
      bookid:this.length+1,
      booktitle:Obj.booktitle,
      author:Obj.author,
      publisher:Obj.publisher,
      publishedyear:Obj.publishedyear,
      category:Obj.category,
      price:Obj.price,
      photo:Obj.photo,
      rating:Obj.rating,
      description:Obj.description

    }
   // booksObj.bookid=this.length+1;
    //console.log(booksObj)
    let formData=new FormData(); 
    //adding image and other data to FormData object 
    formData.append('photo',this.file,this.file.name); 
    formData.append("booksObj",JSON.stringify(booksObj))

    this.bs.createBook(formData).subscribe(
      res=>{
        if(res.message=="book created"){
          //alert("book created successfully")
          this.notifierService.showNotification('book created successfully','Thank You')
        }
        if(res.message=="book already existed"){
          //alert("book already existed...choose another bookid")
          this.notifierService.showNotification('book already existed...choose another bookid','Dismiss')
        }
      },
      err=>{
        //alert("something went wrong in book creation")
        this.notifierService.showNotification('something went wrong in book creation','Dismiss')
        console.log(err)
      }
    )


  }
  //buttons action
  onView(){
    //navigate to all products
    this.router.navigateByUrl("/admin/booklist")
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
  onList(){
    this.router.navigateByUrl("/admin/userlist")
  }
 

}
