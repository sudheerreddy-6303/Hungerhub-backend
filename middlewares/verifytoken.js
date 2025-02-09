const vender = require("../models/vender")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const vendor = require("../models/vender")
dotenv.config()
const secretkey = process.env.whatisyourname


const verifytoken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "token is required" });
    }
    try {
        const decoded = jwt.verify(token, secretkey)
        // console.log(decoded.venderid)

        const vendor = await vender.findById(decoded.venderid)
        // console.log(vendor)

        if (!vendor) {
            return res.status(404).json({ Error: "vender not found" })
        }
        req.venderId = vendor._id


        next()
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "invalid token"
        })
    }
}


module.exports = verifytoken
