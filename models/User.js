const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        mobile:{
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

const User = mongoose.model("users", UserSchema);

module.exports = User;