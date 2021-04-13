import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { NotifierService } from 'src/app/notifier.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userObj:any;
  userArray=[];
  userid:number;
  length:number;
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }
  onLogin(){
    this.router.navigateByUrl("/login")
  }

  onSubmit(formRef){
    if(formRef.valid){
      this.userObj=formRef.value;
      this.userObj.userid=this.userid;
      console.log(this.userObj)
      this.bs.createUser(this.userObj).subscribe(
        res=>{
          if(res.message=="user existed"){
            //alert("username is already taken.. choose another")
            this.notifierService.showNotification('username is already taken.. choose another','Dismiss')
          }
          else if(res.message=="password and confirmpassword should be same"){
           // alert("password & confirm password should be same")
            this.notifierService.showNotification('password & confirm password should be same','Dismiss')
          }
          else{
            //alert("user created successfully")
            this.notifierService.showNotification('user created successfully','Thank You')
            //this.router.navigateByUrl("/login")
          }
          
        },
        err=>{
          //alert("something went wrong in user creation")
          this.notifierService.showNotification('something went wrong in user creation','Dismiss')
          console.log(err)
        }
      )
    }
    
  }
  
  ngOnInit(): void {
    this.bs.getUsers().subscribe(
      res=>{
        this.userArray=res.message;
        this.length=this.userArray.length;
        if(this.length!==0){
          this.userid=(+this.userArray[this.length-1].userid)+1;
        }
        else{
          this.userid=3036;
        }
      },
    )
  }

}
