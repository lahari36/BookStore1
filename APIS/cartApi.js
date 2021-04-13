const exp=require("express");
const cartApiObj=exp.Router();
const errorHandler=require("express-async-handler")
const verifyToken=require("./middlewares/verifyToken")
const bcryptjs=require("bcryptjs")

const jwt=require("jsonwebtoken")

cartApiObj.use(exp.json())
//requests
cartApiObj.post("/createcart",verifyToken,errorHandler(async(req,res,next)=>{
    //get cart obj
    let cartCollectionObj=req.app.get("cartCollectionObj");

    let cartObj=req.body;
    //console.log(req.body)

    let cart=await cartCollectionObj.findOne({bookid:+cartObj.bookid,userid:cartObj.userid})
    if(cart==null){
        await cartCollectionObj.insertOne(cartObj);
        res.send({message:"book added to cart successfully"})
    }
    else if(cart.userid!==null){
        let list=await cartCollectionObj.findOne({userid:cart.userid})
        if(cart.bookid==null){
            await cartCollectionObj.inserOne(cartObj);
            res.send({message:"book added to cart successfully"})
        }
        else{
            res.send({message:"book already existed in cart"})
        }
    }
}))
//get
cartApiObj.get("/getcart/:userid",verifyToken,errorHandler(async(req,res,next)=>{
    //get cart obj
    let cartCollectionObj=req.app.get("cartCollectionObj");
    let booksCollectionObj=req.app.get("booksCollectionObj");

    let cartArray=await cartCollectionObj.find({userid:req.params.userid}).toArray();
    let booksArray=await booksCollectionObj.find().toArray();
    res.send({cart:cartArray,books:booksArray})
}))
//delete
cartApiObj.delete("/deletecart/:bookid",verifyToken,errorHandler(async(req,res,next)=>{
    //get cart obj
    let cartCollectionObj=req.app.get("cartCollectionObj");

    let success=await cartCollectionObj.removeOne({bookid:+req.params.bookid});
    res.send({message:"book deleted from cart successfully"})
}))
//export 
module.exports=cartApiObj;
