
const userModel = require("../models/usermodel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generatetoken")


module.exports.generateUser = async function(req,res){


    try{
        let{email,password,fullname} = req.body;
        let user = await userModel.findOne({email});
        if(user){
           req.flash("error","cant create")
           res.redirect("/")
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) res.send(err.message);
                else{
                    let user = await userModel.create({
                        email,
                        password : hash,
                        fullname
                    })
                    let token = generateToken(user);
                    res.cookie("token" , token);
                    res.send(user)
                } 
            });
        });
   
    }catch(err){
        console.log(err.message);
    }
}

module.exports.loginUser = async function(req,res){
    let {email,password}=req.body;
    let user = await userModel.findOne({email});
    if(user){
        bcrypt.compare(password,user.password,function(err,result){
           if(result){
            let token = generateToken(user);
            res.cookie("token",token);
            res.redirect("/shop")
           }else{
            res.send("something went wrong")
           }
        })
    }else{
        req.flash('error', 'Email not found. Please register.');
        res.redirect('/');
    }
}



module.exports.logout = async function(req,res){
    res.clearCookie('token', { path: '/' });
    req.flash('info', 'You have been logged out successfully.');
    res.redirect("/")
}