const vendercontroler = require("../controllers/vendorControler")
const express = require("express")
// const router=express.Router();

const router = express.Router();
router.post("/register", vendercontroler.vendoregister);

router.post("/login", vendercontroler.venderlogin)
router.get("/all-venders",vendercontroler.getallreco)
router.get("/single-vendor/:krishna",vendercontroler.getVendorById)


module.exports = router;



