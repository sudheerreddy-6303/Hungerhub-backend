const express=require("express")
const dotEnv=require("dotenv");

const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const vendorRoutes = require("./routes/venderrouts"); 
const firmroutes=require("./routes/firmroutes")
const productroutes=require("./routes/productroutes")
const path=require("path")

// const venderoutes=require("./routes/venderrouts")


// const mongoose=require("mongoose")



var app=express()

const port=4000;

dotEnv.config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected sucessfully")
})
.catch((error)=>{
    console.log(error)
})
app.use(bodyparser.json())
app.use("/vender",vendorRoutes)
app.use("/firm",firmroutes)
app.use("/product",productroutes);
app.use("/uploads",express.static("uploads"))



app.listen(port,()=>{
    console.log(`server started at${port}`)
})


app.use("/home",(req,res)=>{
    res.send("<h1> welcome to swiggy")
})