const mongoose = require("mongoose")

const CardSchema = new mongoose.Schema(
    {
        photo: String,
        caseType: String,
        name: String,
        age: Number,
        gender:String,
        
    },
);

const CardModel = mongoose.model("card", CardSchema);

module.exports = CardModel;