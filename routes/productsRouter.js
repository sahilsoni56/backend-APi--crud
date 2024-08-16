const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel")
router.post("/create",upload.single("image"),async function(req,res){
    let {image,name,price,discount,bgcolor,panelcolor,textcolor} = req.body;
    let product = await productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    });
    req.flash("success","product created succesfully");
    res.redirect("/owner/admin")
});
  
module.exports = router;