import jwt from 'jsonwebtoken';

export const authmiddleware = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    try{
        let decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(401).json({message: "invalid token"}) 
    }
}
export const checkRole = (role)=>{
    return(req,res,next)=>{
        if(req.user.role != role){
            return res.status(403).json({message: "Forbidden"})
        }
        next();
    }
}
