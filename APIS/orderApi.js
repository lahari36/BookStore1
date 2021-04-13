const exp=require("express");
const orderApiObj=exp.Router();
const errorHandler=require("express-async-handler")
const verifyToken=require("./middlewares/verifyToken")
const bcryptjs=require("bcryptjs")

const jwt=require("jsonwebtoken")

orderApiObj.use(exp.json())
//requests
orderApiObj.post("/createorder",verifyToken,errorHandler(async(req,res,next)=>{
    //get order obj
    let orderCollectionObj=req.app.get("orderCollectionObj");

    let orderObj=req.body;

   await orderCollectionObj.insertOne(orderObj);
   res.send({message:"book purchased successfully"})
     

}))
//get 
orderApiObj.get("/getorder/:userid",verifyToken,errorHandler(async(req,res,next)=>{
    //get order obj
    let orderCollectionObj=req.app.get("orderCollectionObj");

   let orderArray= await orderCollectionObj.find({userid:req.params.userid}).toArray();
    res.send({message:orderArray})
}))
//delete
orderApiObj.delete("/deleteorder/:bookid",verifyToken,errorHandler(async(req,res,next)=>{
    //get order obj
    let orderCollectionObj=req.app.get("orderCollectionObj");

    await orderCollectionObj.removeOne({bookid:+req.params.bookid})
    res.send({message:"book returned successfully"})
}))
//export 
module.exports=orderApiObj;
