import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userObj:any;
  constructor(private bs:BookService,private router:Router) { }
  onLogin(){
    this.router.navigateByUrl("/login")
  }
  onSubmit(formRef){
    if(formRef.valid){
      this.userObj=formRef.value;
      this.bs.createUser(this.userObj).subscribe(
        res=>{
          if(res.message=="user existed"){
            alert("username is already taken.. choose another")
          }
          else if(res.message=="password and confirmpassword should be same"){
            alert("password & confirm password should be same")
          }
          else{
            alert("user created successfully")
            this.router.navigateByUrl("/login")
          }
          
        },
        err=>{
          alert("something went wrong in user creation")
          console.log(err)
        }
      )
    }
    
  }
  
  ngOnInit(): void {
  }

}
