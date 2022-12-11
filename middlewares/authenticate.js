const jwt = require("jsonwebtoken")

const authenticate = (req, res, next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        // console.log(token)
        const decode = jwt.verify(token, "iamkey")
        if(decode){
            const authorID = decode.userID
            req.body.authorID = authorID
            next()
        }else{
            res.send("Please Login invalid token")
        }
        
    }else{
        res.send("Please Login")
    }
}

module.exports = {authenticate}