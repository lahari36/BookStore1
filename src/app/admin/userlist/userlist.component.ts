import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userArray=[];
  obj:any;
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }
  
  ngOnInit(): void {
    this.bs.getUsers().subscribe(
      res=>{
        this.userArray=res.message;
        //console.log(this.userArray)
      },
      err=>{
        //alert("something went wrong in getting user data");
        this.notifierService.showNotification('something went wrong in book deletion','Dismiss')
        console.log(err)
      }
    )
  }
  onDelete(i){
    this.obj=this.userArray[i];
    let userid=this.obj.userid;
    this.bs.deleteUser(userid).subscribe(
      res=>{
        if(res.message=="user deleted"){
          //alert("User deleted successfully")
          this.notifierService.showNotification('User deleted successfully','Dismiss')
          window.location.reload();
        }
      },
      err=>{
        //alert("something went wrong in deleting user...");
        this.notifierService.showNotification('something went wrong in deleting user...','Dismiss')
        console.log(err);
      }
    )
  }
  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/home")
  }
}
