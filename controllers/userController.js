const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const users = require("../models/userModel")
const generateToken = require("../utilities/generateToken")

const signUp = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userExist = await users.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "user already exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPasssword = await bcrypt.hash(password, salt)

        const newUser = new users({ name, email, password: hashedPasssword });
        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id);
        res.cookie("user-token", token);
        res.status(201).json({ message: "Sign-in Successfully", user: savedUser })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Error registering user" });

    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const lUser = await users.findOne({ email })
        if (!lUser) {
            res.status(400).json({ message: "Invalid email" })
        }
        const isMatch = await bcrypt.compare(password, lUser.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ id: lUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { name: lUser.name, email: lUser.email } });

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Error Login user" });
    }
}

module.exports = {
    signUp,
    login
}