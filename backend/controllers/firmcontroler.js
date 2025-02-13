const Firm = require("../models/firm");
// const Vendor = require("../models/vender");
const vender = require("../models/vender")
const multer = require("multer")
const path=require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +path.extname( file.originalname));
    }
});
const upload = multer({ storage: storage });



const addfirm = async (req, res) => {
    try {

        const { firmname, area, category, region, offer } = req.body;

        const image = req.file ? req.file.filename : undefined;



        const vendorFromDb = await vender.findById(req.venderId)
        if (!vendorFromDb) {
            res.status(404).json({ message: "vendor not found" })
        }

        const newfirm = new Firm({
            firmname, area, category, region, offer, image, vender: vendorFromDb._id
        })
        const savedFirm = await newfirm.save();
        //  console.log(savedFirm)
        vendorFromDb.firm.push(savedFirm._id);
        //  console.log(vendorFromDb)


        await vendorFromDb.save()
        return res.status(200).json({ message: "firm add sucessfully" })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internam server error" })

    }

}
// this for deleting the firms
const deleteFirmById=async(req,res)=>{
    try {
        const firmId=req.prams.firmId;
        const deletedfirm=await Firm.findByIdAndDelete(firmId);
        if(!deletedfirm){
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
// module.exports={addfirm:[upload.single("image"),addfirm]}
module.exports = { addfirm: [upload.single("image"), addfirm],deleteFirmById };
