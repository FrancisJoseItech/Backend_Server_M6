const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Db connection successfull")

    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = { connectDb }