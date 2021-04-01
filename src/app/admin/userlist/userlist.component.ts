import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userArray=[];
  obj:any;
  constructor(private bs:BookService,private router:Router) { }
  
  ngOnInit(): void {
    this.bs.getUsers().subscribe(
      res=>{
        this.userArray=res.message;
        //console.log(this.userArray)
      },
      err=>{
        alert("something went wrong in getting user data");
        console.log(err)
      }
    )
  }
  onDelete(i){
    this.obj=this.userArray[i];
    let username=this.obj.username;
    this.bs.deleteUser(username).subscribe(
      res=>{
        if(res.message=="user deleted"){
          alert("User deleted successfully")
        }
      },
      err=>{
        alert("something went wrong in deleting user...");
        console.log(err);
      }
    )
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }
}
