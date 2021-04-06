const exp=require("express");
const wishlistApiObj=exp.Router();
const errorHandler=require("express-async-handler")

const bcryptjs=require("bcryptjs")

const jwt=require("jsonwebtoken")

wishlistApiObj.use(exp.json())

//req
wishlistApiObj.post("/createwishlist",errorHandler(async(req,res,next)=>{
    //get wishlist obj
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj");

    let wishlistObj=req.body;
    //console.log(req.body)

    let wishlist=await wishlistCollectionObj.findOne({booktitle:wishlistObj.booktitle,username:wishlistObj.username})
    if(wishlist==null){
        await wishlistCollectionObj.insertOne(wishlistObj);
        res.send({message:"book added to wishlist successfully"})
    }
    else if(wishlist.username!==null){
        let list=await wishlistCollectionObj.findOne({username:wishlist.username})
        if(wishlist.booktitle==null){
            await wishlistCollectionObj.inserOne(wishlistObj);
            res.send({message:"book added to wishlist successfully"})
        }
        else{
            res.send({message:"book already existed in wishlist"})
        }
    }
     

}))
//get
wishlistApiObj.get("/getwishlist/:username",errorHandler(async (req,res,next)=>{
    //get wishlist api obj
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj");

    let wishlistArray=await wishlistCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:wishlistArray});
}))
wishlistApiObj.delete("/deletebook/:booktitle",errorHandler(async(req,res,next)=>{

    //get wishlist api obj
    let wishlistCollectionObj=req.app.get("wishlistCollectionObj");

    let success=await wishlistCollectionObj.removeOne({booktitle:req.params.booktitle});
    res.send({message:"book deleted successfully"})
}))
//export 
module.exports=wishlistApiObj;
