const exp=require("express");
const cartApiObj=exp.Router();
const errorHandler=require("express-async-handler")

const bcryptjs=require("bcryptjs")

const jwt=require("jsonwebtoken")

cartApiObj.use(exp.json())


//export 
module.exports=cartApiObj;
