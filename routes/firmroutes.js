const express = require("express")
const firmcontroler = require("../controllers/firmcontroler")
const verifytoken = require("../middlewares/verifytoken");
// const productControler = require("../controllers/productControler");

const router = express.Router()

router.post("/add-firm", verifytoken, firmcontroler.addfirm);

router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    req.headers("Content-Type","image/jpeg");
    res.sendFile(Path.join(__dirname,"..","uploads",imageName))
})
router.delete("/:firmId",firmcontroler.deleteFirmById)
module.exports = router;