import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private bs:BookService,private router:Router) { }

  ngOnInit(): void {
    
  }
  onSubmit(formRef){
    let obj=formRef.value;
    if(obj.username=="admin"){
      //console.log(obj)
      this.bs.loginAdmin(obj).subscribe(
        res=>{
          if(res.message=="success"){
            //store token and username in local storage
            localStorage.setItem("token",res.signedToken)
            localStorage.setItem("username",res.username)
  
            //navigate to userdashboard
            this.router.navigateByUrl("/admin/addbook")
          }
          else{
            alert(res.message)
          }
        },
        err=>{
          alert("Something went wrong in admin login")
            console.log(err)
        }
      )
    }
    else{
      this.bs.loginUser(obj).subscribe(
        res=>{
          if(res.message=="success"){
            //store username
            localStorage.setItem("token",res.signedToken)
            localStorage.setItem("username",res.username)
  
            this.router.navigateByUrl("/userdashboard");
  
          }
          else if(res.message="Invalid username"){
            alert("Invalid user")
           
            
          }
          else{
            if(res.message="Invalid password"){
              alert("Invalid password")
            }
  
            
          }
        },
        err=>{
          alert("something went wrong in login")
          console.log(err)
        }
      )
    }
  }

}

