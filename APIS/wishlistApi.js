const exp=require("express");
const wishlistApiObj=exp.Router();
const errorHandler=require("express-async-handler")
const verifyToken=require("./middlewares/verifyToken")
const bcryptjs=require("bcryptjs")

const jwt=require("jsonwebtoken")

wishlistApiObj.use(exp.json())

//req
wishlistApiObj.post("/createwishlist",verifyToken,errorHandler(async(req,res,next)=>{
    //get wishlist obj
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj");

    let wishlistObj=req.body;
    //console.log(req.body)

    let wishlist=await wishlistCollectionObj.findOne({bookid:+wishlistObj.bookid,userid:wishlistObj.userid})
    if(wishlist==null){
        await wishlistCollectionObj.insertOne(wishlistObj);
        res.send({message:"book added to wishlist successfully"})
    }
    else if(wishlist.userid!==null){
        let list=await wishlistCollectionObj.findOne({userid:wishlist.userid})
        if(wishlist.bookid==null){
            await wishlistCollectionObj.inserOne(wishlistObj);
            res.send({message:"book added to wishlist successfully"})
        }
        else{
            res.send({message:"book already existed in wishlist"})
        }
    }
     

}))
//get
wishlistApiObj.get("/getwishlist/:userid",verifyToken,errorHandler(async (req,res,next)=>{
    //get wishlist api obj
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj");
    let booksCollectionObj=req.app.get("booksCollectionObj")

    let wishlistArray=await wishlistCollectionObj.find({userid:req.params.userid}).toArray();
    let booksArray=await booksCollectionObj.find().toArray();
    res.send({wishlist:wishlistArray,books:booksArray});
}))
wishlistApiObj.delete("/deletebook/:bookid",verifyToken,errorHandler(async(req,res,next)=>{

    //get wishlist api obj
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj");

    let success=await wishlistCollectionObj.removeOne({bookid:+req.params.bookid});
    res.send({message:"book deleted successfully"})
}))
//export 
module.exports=wishlistApiObj;
