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
  getBook(bookid){
    return this.hc.get("/books/getbook/"+bookid)
  }
  getBooks1(category):Observable<any>{
    return this.hc.get("/books/getbooks1/"+category)
  }
  deleteBook(bookid):Observable<any>{
    return this.hc.delete("/books/deletebook/"+bookid)
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
  getUser(userid):Observable<any>{
    return this.hc.get("/user/getuser/"+userid);
  }
  deleteUser(userid):Observable<any>{
    return this.hc.delete("/user/deleteuser/"+userid);
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
  getWishlist(userid):Observable<any>{
    return this.hc.get("/wishlist/getwishlist/"+userid);
  }
 deleteWishlist(bookid):Observable<any>{
   return this.hc.delete("/wishlist/deletebook/"+bookid);
 }
 createOrder(orderObj):Observable<any>{
   return this.hc.post("/order/createorder",orderObj)
 }
 getOrder(userid):Observable<any>{
   return this.hc.get("/order/getorder/"+userid);
 }
 deleteOrder(bookid):Observable<any>{
   return this.hc.delete("/order/deleteorder/"+bookid)
 }
 createCart(cartObj):Observable<any>{
   return this.hc.post("/cart/createcart",cartObj);
 }
 getCart(userid):Observable<any>{
   return this.hc.get("/cart/getcart/"+userid);
 }
 deleteCart(bookid):Observable<any>{
   return this.hc.delete("/cart/deletecart/"+bookid)
 }
}
