const exp=require("express");
const userApiObj=exp.Router();
const errorHandler=require("express-async-handler")
const verifyToken=require("./middlewares/verifyToken")

const bcryptjs=require("bcryptjs")

const jwt=require("jsonwebtoken")

userApiObj.use(exp.json())

//req handling routes
userApiObj.post("/register",errorHandler(async (req,res,next)=>{

    //get user api obj
    let userCollectionObj=req.app.get("userCollectionObj");

    let user=req.body;

    let userObj=await userCollectionObj.findOne({userid:user.userid});
    if(userObj==null){
        
        if(user.password==user.confirmpassword){
            let hashedpw=await bcryptjs.hash(user.password,5);
            user.password=hashedpw;
            let hashedpw1=await bcryptjs.hash(user.confirmpassword,5);
            user.confirmpassword=hashedpw1;
            await userCollectionObj.insertOne(user);
            res.send({message:"user created"})
        }
        else{
            res.send({message:"password and confirmpassword should be same"})
        }
    }
    else{
        res.send({message:"user existed"})
    }
}))
// login
userApiObj.post("/login",errorHandler(async (req,res,next)=>{

    //get usercollectionobject
    let userCollectionObj=req.app.get("userCollectionObj")

    let userCreditObj=req.body;

    //verify username
    let user=await userCollectionObj.findOne({userid:+userCreditObj.userid})

    //if user not existed
    if(user==null){
        res.send({message:"Invalid userid"})
    }
    else{

        //verify password
        let status=await bcryptjs.compare(userCreditObj.password,user.password)

        //if password matched
        if(status==true){

            //create json token
            let token=await jwt.sign({userid:user.userid},"abcd",{expiresIn:100})
            //send token
            res.send({message:"success",signedToken:token,userid:user.userid})
        }
        else{
            res.send({message:"Invalid password"})
        }
    }
}))
//get users
userApiObj.get("/getusers",errorHandler(async(req,res,next)=>{
    //get usercollectionobject
    let userCollectionObj=req.app.get("userCollectionObj")

    let userArray=await userCollectionObj.find().toArray();
    res.send({message:userArray})
}))
//get user
userApiObj.get("/getuser/:userid",verifyToken,errorHandler(async(req,res,next)=>{
     //get usercollectionobject
     let userCollectionObj=req.app.get("userCollectionObj")

    let userObj=await userCollectionObj.findOne({userid:+req.params.userid})
    res.send({user:userObj})
}))
//delete user
userApiObj.delete("/deleteuser/:userid",verifyToken,errorHandler(async(req,res,next)=>{
    //get usercollectionobject
    let userCollectionObj=req.app.get("userCollectionObj")

    let success=await userCollectionObj.removeOne({userid:req.params.userid})
    res.send({message:"user deleted"})    
}))
//export 
module.exports=userApiObj;