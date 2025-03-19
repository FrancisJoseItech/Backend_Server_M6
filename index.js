const express = require("express")
const cors = require("cors")
require("dotenv").config();
const { connectDb } = require("./config/dbConnection");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");


const app = express();
connectDb();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [process.env.frontend_url, "https://frontend-client-m6.vercel.app/"]
}));

app.use("/", (req, res)=>{
    res.status(200).json({message:"server hitted"})
})

app.use("/user", router)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));