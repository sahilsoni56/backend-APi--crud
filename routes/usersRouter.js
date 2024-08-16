const express = require("express");
const router = express.Router();
const {generateUser,loginUser,logout} = require("../controllers/authController")
const cookieparser = require("cookie-parser");
router.get("/",function(req,res){
    res.send("hey its working");
});

router.post("/register", generateUser)
router.post("/login",loginUser);
router.get("/logout",logout);

module.exports = router;