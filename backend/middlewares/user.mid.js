const jwt = require("jsonwebtoken");
const { jwtUserPassword } = require("../config");

const usermiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization

    try {
        if(!authHeader || !authHeader.startWith("Bearer")){
            return res.json({errors:"Access Denied"})
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, jwtUserPassword)
        req.userId = decoded._id
        next();
    } catch (error) {
        console.log("Error in user authorization",error)
        res.json("Access Denied")
    }
}

module.exports = usermiddleware
