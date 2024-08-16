
const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model")

router.post("/create",async function(req,res){
    let owners=await ownerModel.find({});
    if(owners.length >0){
        return res.status(503).send("you cant bve the new user");
    }
    const {fullname,email,password} = req.body;
    let created_owner = await userModel.create({
        fullname,
        email,
        password,
    })
    res.status(200).send(created_owner)
});

router.get("/admin",function(req,res){
    let success = req.flash("success")
    res.render("createproduct",{success});
})




module.exports = router;
