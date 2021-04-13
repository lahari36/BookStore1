import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { NotifierService } from '../notifier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username=localStorage.getItem("username");
  //inject services
  constructor(private bs:BookService,private router:Router,private notifierService:NotifierService) { }

  ngOnInit(): void {
    
  }
  onSubmit(formRef){
    //if admin is logged in
    let obj=formRef.value;
    if(obj.userid=="admin"){
      //console.log(obj)
      this.bs.loginAdmin(obj).subscribe(
        res=>{
          if(res.message=="success"){
            //store token and username in local storage
            localStorage.setItem("token",res.signedToken)
            localStorage.setItem("userid",res.userid)
  
            //navigate to userdashboard
            this.router.navigateByUrl("/admin/addbook")
          }
          else{
            //alert(res.message)
            this.notifierService.showNotification(res.message,'Dismiss')
          }
        },
        err=>{
          //alert("Something went wrong in admin login")
          this.notifierService.showNotification('Something went wrong in admin login','Dismiss')
            console.log(err)
        }
      )
    }
        //if user logged in
    else{
      this.bs.loginUser(obj).subscribe(
        res=>{
          if(res.message=="success"){
            //store username
            localStorage.setItem("token",res.signedToken)
            localStorage.setItem("userid",res.userid)
  
            this.router.navigateByUrl("/userdashboard");
  
          }
          else if(res.message="Invalid username"){
            //alert("Invalid user")
            this.notifierService.showNotification('Invalid user','Dismiss')
           
            
          }
          else{
            if(res.message="Invalid password"){
              //alert("Invalid password")
              this.notifierService.showNotification('Invalid password','Dismiss')
            }
  
            
          }
        },
        err=>{
          //alert("something went wrong in login")
          this.notifierService.showNotification('something went wrong in login','Dismiss')
          console.log(err)
        }
      )
    }
  }

}

