const mongoose = require("mongoose")

const imageEx = new mongoose.Schema(
    {
        image: String,
            
    }
)

const ImageEx = mongoose.model("ImageEx", imageEx);

module.exports = ImageEx;
