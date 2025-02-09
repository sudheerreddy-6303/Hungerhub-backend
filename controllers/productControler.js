
const Product = require("../models/product");
const multer = require("multer");
// const Firm=require("../controllers/firmcontroler")
const Firm = require("../models/firm");
const path=require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;
        // we are adding the product using the firm id
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({
                error: "no firm found"
            })
        }
            const newProduct  = new Product({
                productName,
                price,
                category,
                bestSeller,
                description,
                image,
                firm: firm._id
            })
            const savedProduct = await newProduct.save();
            firm.product.push(savedProduct._id);
            await firm.save()
            res.status(200).json(savedProduct)
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:"internal server error"
        })
    }

}
const getProductsByFirm=async(req,res)=>{
    try {
        const firmId=req.params.firmId
        const firm=await Firm.findById(firmId)
        // console.log(firmId)
        if(!firm){
            return res.status(404).json({
                error:"no firm found"
            })
        }
        const restarentName=firm.firmname;
        const products=await Product.find({firm:firmId})
        res.status(200).json({restarentName,products})
       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:"internal server error"
        }) 
    }
}

const deleteProductById=async(req,res)=>{
    try {
        const productId=req.prams.productId;
        const deletedProduct=await product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({
                error:"no product found"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:"internal server error"
        }) 
    }
}

module.exports={addProduct:[upload.single("image"),addProduct],getProductsByFirm,deleteProductById}
