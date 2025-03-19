const express = require("express");
const { signUp, login } = require("../controllers/userController");

const router = express.Router();

router.post("/register", signUp);
router.post("/login", login);

module.exports = router;