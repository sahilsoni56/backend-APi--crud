const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const usermodel = require("../models/usermodel");
const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index",{error,loggedin:false});
});
router.get("/shop",isLoggedIn,async function(req,res){
    let products = await productModel.find();
    let success = req.flash("success")
    res.render("shop",{products,success});
})
router.get("/cart",isLoggedIn,async function(req,res){
   let user = await usermodel.findOne({email:req.user.email}).populate("cart");

    res.render("cart",{user});
})
router.get("/addtoacart/:productid",isLoggedIn,async function(req,res){
    
    let user = await usermodel.findOne({email:req.user.email});
    console.log(user.cart)
    
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","added to cart");
    res.redirect("/shop")
})
module.exports = router;