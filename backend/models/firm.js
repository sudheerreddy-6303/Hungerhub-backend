const mongoose = require("mongoose");
const product = require("./product");
// const vender = require("./vender")

const firmschema = new mongoose.Schema({
    firmname: {
        type: String,
        required: true,
        unique: true
    },
    area: {
        type: String,
        required: true,
    },
    category: {
        type: [
            {
                type: String,
                enum: ["veg", "non-veg"]
            }
        ]
    },
    region: {
        type: [
            {
                type: String,
                enum: ["south indian", "north indian", "chinese", "bakery"] 
                
            }
        ]

    },
    offer: {
        type: String
    },
    image: {
        type: String
    },
    vender: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vender"
        }
    ],
    product:[{
            type:mongoose.Schema.ObjectId,
            ref:"product"
        }]
})
// const Firm=mongoose.model("Firm".firmschema)
 const Firm = mongoose.model("Firm", firmschema);
module.exports = Firm