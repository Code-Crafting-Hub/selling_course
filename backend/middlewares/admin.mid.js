const jwt = require("jsonwebtoken");
const { jwtAdminPassword } = require("../config");

const adminMiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization

    try {
        if(!authHeader || !authHeader.startWith("Bearer")){
            return res.json({errors:"Access Denied"})
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, jwtAdminPassword)
        req.userId = decoded._id
        next();
    } catch (error) {
        console.log("Error in user authorization",error)
        res.json("Access Denied")
    }
}

module.exports = adminMiddleware
