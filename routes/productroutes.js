const express=require("express")
const productControler=require("../controllers/productControler")
const router=express.Router()
router.post("/add-product/:firmId",productControler.addProduct);
router.get("/:firmId/products",productControler.getProductsByFirm)
router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    req.headers("Content-Type","image/jpeg");
    res.sendFile(Path.join(__dirname,"..","uploads",imageName))
})

router.delete("/:productId",productControler.deleteProductById)
module.exports=router;
