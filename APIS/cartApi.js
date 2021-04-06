const exp=require("express");
const cartApiObj=exp.Router();
const errorHandler=require("express-async-handler")

const bcryptjs=require("bcryptjs")

const jwt=require("jsonwebtoken")

cartApiObj.use(exp.json())
//requests
cartApiObj.post("/createcart",errorHandler(async(req,res,next)=>{
    //get cart obj
    let cartCollectionObj=req.app.get("cartCollectionObj");

    let cartObj=req.body;
    //console.log(req.body)

    let cart=await cartCollectionObj.findOne({booktitle:cartObj.booktitle,username:cartObj.username})
    if(cart==null){
        await cartCollectionObj.insertOne(cartObj);
        res.send({message:"book added to cart successfully"})
    }
    else if(cart.username!==null){
        let list=await cartCollectionObj.findOne({username:cart.username})
        if(cart.booktitle==null){
            await cartCollectionObj.inserOne(cartObj);
            res.send({message:"book added to cart successfully"})
        }
        else{
            res.send({message:"book already existed in cart"})
        }
    }
}))
//get
cartApiObj.get("/getcart/:username",errorHandler(async(req,res,next)=>{
    //get cart obj
    let cartCollectionObj=req.app.get("cartCollectionObj");

    let cartArray=await cartCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:cartArray})
}))
//delete
cartApiObj.delete("/deletecart/:booktitle",errorHandler(async(req,res,next)=>{
    //get cart obj
    let cartCollectionObj=req.app.get("cartCollectionObj");

    let success=await cartCollectionObj.removeOne({booktitle:req.params.booktitle});
    res.send({message:"book deleted from cart successfully"})
}))
//export 
module.exports=cartApiObj;
