
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { userInfo } = require("os")
const {UsersModel} = require("../models/Auth.model")

const authRouter = express.Router()

authRouter.post("/signup", async(req, res)=>{
    
    try {
        const {name, username, password} = req.body
        bcrypt.hash(password, 7, async(err, hashed)=>{
            const submitData = new UsersModel({name, password:hashed,username})
            await submitData.save()
            res.json({"msg": "Signup Succesfull"})

            
        })
        
        
    } catch (err) {
        console.log(err)
        res.send("SignUp faild")
        
    }
})

authRouter.post("/login", async(req, res)=>{
    try {
        const {username, password} = req.body
        const user = await UsersModel.findOne({username})
        
        if(user){
            bcrypt.compare(password, user.password, (err, valid)=>{
                if(valid){
                    const token = jwt.sign({"userID": user._id}, "iamkey")
                    res.json({"msg":"Login successfull","token" : token, "user": user.name})
                }else{
                    res.send("Login Failed/ wrong password")
                }
            })
           
        }
        else{
            res.send("No User Found!")
        }
        
    } catch (err) {
        console.log(err)
        res.json({"msg": "Login failed"})
        
    }
})

module.exports = {authRouter}