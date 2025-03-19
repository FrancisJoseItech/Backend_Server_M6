const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("users", userSchema);