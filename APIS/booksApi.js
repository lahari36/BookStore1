const exp=require("express");
const booksApiObj=exp.Router();
const errorHandler=require("express-async-handler")
const path=require("path");
const verifyToken=require("./middlewares/verifyToken")
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
    
    //console.log("req body is",req.body.booksObj);

    let book=await booksCollectionObj.findOne({bookid:+booksObj.bookid});
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
}))+

//delete
booksApiObj.delete("/deletebook/:bookid",verifyToken,errorHandler(async (req,res,next)=>{

     //get book obj
     let booksCollectionObj=req.app.get("booksCollectionObj")

     let success=await booksCollectionObj.removeOne({bookid:+req.params.bookid})
     res.send({message:"book deleted"})
}))
booksApiObj.get("/getbook/:bookid",errorHandler(async(req,res,next)=>{
    //get book obj
    let booksCollectionObj=req.app.get("booksCollectionObj");

    let bookObj=await booksCollectionObj.findOne({bookid:+req.params.bookid})
    res.send(bookObj)
}))
booksApiObj.get("/getbooks1/:category",errorHandler(async(req,res,next)=>{
    //get book obj
    let booksCollectionObj=req.app.get("booksCollectionObj");

    let categoryArray=await booksCollectionObj.find({category:req.params.category}).toArray();
    res.send({message:categoryArray})
}))
booksApiObj.put("/editbook",verifyToken,errorHandler(async(req,res,next)=>{
    //get book obj
    let booksCollectionObj=req.app.get("booksCollectionObj");

    let bookObj=await booksCollectionObj.findOne({bookid:+req.body.bookid});
    if(bookObj!=null){
        let success=await booksCollectionObj.updateOne({bookid:+req.body.bookid},{$set:{
            author:req.body.author,
            publisher:req.body.publisher,
            publishedyear:req.body.publishedyear,
            category:req.body.category,
            price:req.body.price,
            rating:req.body.rating,
            description:req.body.description
        }});
        res.send({message:"success"});
    }
    else{
        res.send({message:"Book not found"})
    }
}))
//export 
module.exports=booksApiObj;