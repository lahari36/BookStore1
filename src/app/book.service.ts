import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private hc:HttpClient) { }
  createBook(booksObj):Observable<any>{
    return this.hc.post("/books/createbook",booksObj);
  }
  getBooks():Observable<any>{
    return this.hc.get("/books/getbooks");
  }
  getBook(booktitle){
    return this.hc.get("/books/getbook/"+booktitle)
  }
  getBooks1(category):Observable<any>{
    return this.hc.get("/books/getbooks1/"+category)
  }
  deleteBook(booktitle):Observable<any>{
    return this.hc.delete("/books/deletebook/"+booktitle)
  }
  editBook(bookObj):Observable<any>{
    return this.hc.put("/books/editbook",bookObj);
  }
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj);
  }
  loginUser(userCredObj):Observable<any>{
    return this.hc.post("/user/login",userCredObj);
  }
  getUsers():Observable<any>{
    return this.hc.get("/user/getusers");
  }
  deleteUser(username):Observable<any>{
    return this.hc.delete("/user/deleteuser/"+username);
  }
  createAdmin(adminObj):Observable<any>{
    return this.hc.post("/admin/createadmin",adminObj);
  }
  loginAdmin(adminCredObj):Observable<any>{
    return this.hc.post("/admin/loginAdmin",adminCredObj);
  }
  createWishlist(wishlistObj):Observable<any>{
    return this.hc.post("/wishlist/createwishlist",wishlistObj);
  }
  getWishlist(username):Observable<any>{
    return this.hc.get("/wishlist/getwishlist/"+username);
  }
 deleteWishlist(booktitle):Observable<any>{
   return this.hc.delete("/wishlist/deletebook/"+booktitle);
 }
 createOrder(orderObj):Observable<any>{
   return this.hc.post("/order/createorder",orderObj)
 }
 getOrder(username):Observable<any>{
   return this.hc.get("/order/getorder/"+username);
 }
 deleteOrder(booktitle):Observable<any>{
   return this.hc.delete("/order/deleteorder/"+booktitle)
 }
 createCart(cartObj):Observable<any>{
   return this.hc.post("/cart/createcart",cartObj);
 }
 getCart(username):Observable<any>{
   return this.hc.get("/cart/getcart/"+username);
 }
 deleteCart(booktitle):Observable<any>{
   return this.hc.delete("/cart/deletecart/"+booktitle)
 }
}
