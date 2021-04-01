import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  submitted=false;
  constructor(private bs:BookService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      username:new FormControl(null,Validators.required),
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phoneno:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      password:new FormControl(null,[Validators.required,Validators.pattern("^(?=.*?[0-9])(?=.*[A-Z]).*$"),Validators.minLength(6)])

    })
  }
  getControl() {
    return this.registerForm.controls;
   
  }
  onSubmit(){
    this.submitted=true;
    if(this.registerForm.valid){
      let adminObj=this.registerForm.value;
      //console.log(adminObj)
      this.bs.createAdmin(adminObj).subscribe(
        res=>{
          if(res.message=="admin existed"){
            alert("username already existed choose another")
          }
          else{
            alert("admin created successfully");
            this.router.navigateByUrl("/admin")
          }
        },
        err=>{
          alert("something went wrong in admin registration");
          console.log(err);
        }
      )
    }
    
  }
}
