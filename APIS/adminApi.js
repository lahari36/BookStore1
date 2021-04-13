//create mini express app
const exp=require("express")
const adminApiObj=exp.Router();

const errorHandler=require("express-async-handler")

const bcryptjs=require("bcryptjs")

const jwt=require("jsonwebtoken")

adminApiObj.use(exp.json())
// req handler
adminApiObj.post("/createadmin",errorHandler(async(req,res,next)=>{

    //get user api obj
    let adminCollectionObj=req.app.get("adminCollectionObj");

    let admin=req.body;

    let adminObj=await adminCollectionObj.findOne({userid:admin.userid});
    if(adminObj==null){
        let hashedpw=await bcryptjs.hash(admin.password,5);
        admin.password=hashedpw;
        await adminCollectionObj.insertOne(admin);
        res.send({message:"admin created"})
    }
    else{
        res.send({message:"admin existed"})
    }

}))

adminApiObj.post("/loginAdmin",errorHandler(async(req,res,next)=>{
     //get admin api obj
     let adminCollectionObj=req.app.get("adminCollectionObj");

     let adminCreditObj=req.body;

    //verify username
    let admin=await adminCollectionObj.findOne({userid:adminCreditObj.userid})

    //if admin not existed
    if(admin==null){
        res.send({message:"Invalid username"})
    }
    else{
        //verify password
        let status=await bcryptjs.compare(adminCreditObj.password,admin.password)
        //if password matched
        if(status==true){

            //create json token
            let token=await jwt.sign({userid:admin.userid},"abcd",{expiresIn:100})
            //send token
            res.send({message:"success",signedToken:token,userid:admin.userid})
        }
        else{
            res.send({message:"Invalid password"})
        }

    }

}))
//export
module.exports=adminApiObj;