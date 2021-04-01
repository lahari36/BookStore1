const exp=require("express");
const booksApiObj=exp.Router();
const errorHandler=require("express-async-handler")
const path=require("path")

const bcryptjs=require("bcryptjs");


//import 
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

//config cloudinary
cloudinary.config({
    cloud_name: 'dnlv3n9r9',
    api_key: '894786795736943',
    api_secret: '7trPi8nVOmSaiuUH2qMVXQN-AEE'
});

//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'book',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    }
});

//congigure multer
var upload = multer({ storage: storage });

booksApiObj.use(exp.json())

//req handlers
booksApiObj.post("/createbook",upload.single('photo'),errorHandler(async (req,res,next)=>{

    //get bookscoll obj
    let booksCollectionObj=req.app.get("booksCollectionObj");

    let booksObj=JSON.parse(req.body.booksObj);
    
    //console.log("req body is",req.body);

    let book=await booksCollectionObj.findOne({booktitle:booksObj.booktitle});
    if(book==null){

        //for image
        booksObj.userImgLink = req.file.path;
        await booksCollectionObj.insertOne(booksObj);
        res.send({message:"book created"})
    }
    else{
        res.send({message:"book already existed"})
    }
}))


//get
booksApiObj.get("/getbooks",errorHandler(async (req,res,next)=>{

    //get books
    let booksCollectionObj=req.app.get("booksCollectionObj")

   let booksArray= await booksCollectionObj.find().toArray();
   res.send({message:booksArray})
}))

//delete
booksApiObj.delete("/deletebook/:booktitle",errorHandler(async (req,res,next)=>{

     //get book obj
     let booksCollectionObj=req.app.get("booksCollectionObj")

     let success=await booksCollectionObj.removeOne({booktitle:req.params.booktitle})
     res.send({message:"book deleted"})
}))
booksApiObj.get("/getbook/:booktitle",errorHandler(async(req,res,next)=>{
    //get book obj
    let booksCollectionObj=req.app.get("booksCollectionObj");

    let bookObj=await booksCollectionObj.findOne({booktitle:req.params.booktitle})
    res.send(bookObj)
}))
booksApiObj.get("/getbooks1/:category",errorHandler(async(req,res,next)=>{
    //get book obj
    let booksCollectionObj=req.app.get("booksCollectionObj");

    let categoryArray=await booksCollectionObj.find({category:req.params.category}).toArray();
    res.send({message:categoryArray})
}))
//export 
module.exports=booksApiObj;