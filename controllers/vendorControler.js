const Vendor=require("../models/vender");
const Firm=require("../models/firm")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")
const dotEnv=require("dotenv")
// const mongoose=require("mongoose")
// console.log(Vendor)
dotEnv.config();
const secretkey=process.env.whatisyourname;
if (!secretkey) {
    throw new Error("Missing environment variable: whatisyourname");
}

const vendoregister=async(req,res)=>{
    const {username, email, password} =req.body
    try{
const existingVendor =await Vendor.findOne({email});
if(existingVendor){
    return res.status(400).json("email already taken")
}
const hashedpassword=await bcrypt.hash(password,10)
const newvender=new Vendor({
    username,
    email,
    password:hashedpassword
})
await newvender.save();
// when the vender will registered sucessfully the below msg will send 
res.status(201).json({message:"vender registered sucessfully"})
console.log("registred")
    }catch (error){
        console.log(error)
res.status(500).json({error:"internal server error"})
    }
}

const venderlogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
const vender=await Vendor.findOne({email})
if(!vender || !(await bcrypt.compare(password,vender.password))){
        return res.status(401).json({error:"invalid username or password pls check once again"})
}

// i am generating the token based on the mongodb inserted records id



    
    const token=jwt.sign({venderid:vender._id},secretkey,{expiresIn:"1h"})
    res.status(200).json({sucess:"login sucessful",token})
    console.log(token)
    


    }
    catch (error){
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
}

// getting All records from venders table

const getallreco=async(req,res)=>{
    try{
        const records = await Vendor.find().populate("firm");
        // populate("Firm")
        // console.log(vendor.find().populate("firm").paths)
        console.log(records)
        
res.json({records})
    }
    catch (error){
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }
}

// here we are getting single vender records based on vender id
const getVendorById=async(req,res)=>{
    // here we are using the quary params for for getting the data
    const vendorid=req.params.krishna;
    
    try {
        const vendor=await Vendor.findById(vendorid).populate("firm")
        if(!vendor){
            return res.status(404).json({error:"vender not found"})
        }
        res.status(200).json({vendor})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})  
    }
}


module.exports={vendoregister,venderlogin,getallreco,getVendorById}