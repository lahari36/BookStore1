const exp=require("express");
const orderApiObj=exp.Router();
const errorHandler=require("express-async-handler")

const bcryptjs=require("bcryptjs")

const jwt=require("jsonwebtoken")

orderApiObj.use(exp.json())
//requests
orderApiObj.post("/createorder",errorHandler(async(req,res,next)=>{
    //get order obj
    let orderCollectionObj=req.app.get("orderCollectionObj");

    let orderObj=req.body;

   await orderCollectionObj.insertOne(orderObj);
   res.send({message:"book purchased successfully"})
     

}))
//get 
orderApiObj.get("/getorder/:username",errorHandler(async(req,res,next)=>{
    //get order obj
    let orderCollectionObj=req.app.get("orderCollectionObj");

   let orderArray= await orderCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:orderArray})
}))
//delete
orderApiObj.delete("/deleteorder/:booktitle",errorHandler(async(req,res,next)=>{
    //get order obj
    let orderCollectionObj=req.app.get("orderCollectionObj");

    await orderCollectionObj.removeOne({booktitle:req.params.booktitle})
    res.send({message:"book returned successfully"})
}))
//export 
module.exports=orderApiObj;
