const mongoose = require("mongoose")
const venderschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firm: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Firm"
        }
    ]
})
const Vendor = mongoose.model("vendor", venderschema);
module.exports = Vendor;