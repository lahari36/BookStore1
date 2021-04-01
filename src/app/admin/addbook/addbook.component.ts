import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  file:File; 
  username=localStorage.getItem("username")
  incomingfile(event:any) {
    this.file= event.target.files[0]; 
  } 
  constructor(private bs:BookService,private router:Router) { }
  onSubmit(formRef){
    let booksObj=formRef.value;
    let formData=new FormData(); 
    //adding image and other data to FormData object 
    formData.append('photo',this.file,this.file.name); 
    formData.append("booksObj",JSON.stringify(booksObj))

    this.bs.createBook(formData).subscribe(
      res=>{
        if(res.message=="book created"){
          alert("book created successfully")
          
        }
        if(res.message=="book already existed"){
          alert("book already existed...choose another bookid")
        }
      },
      err=>{
        alert("something went wrong in book creation")
        console.log(err)
      }
    )


  }
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
  ngOnInit(): void {
  }

}
