
// const jwt =require("jsonwebtoken");
// const express = require('express');
// const app = express();
const sectet="ritik"
// const Sevice={
//       authMiddleware(req,res,next){
//         if (!req.headers['authorization']) {
//             return res.status(401).send({"Token": "Authorization header not found"});
//         }else{
//             const token = req.headers['authorization'].split(' ')[1]



//         if(token){
//             jwt.verify(token,sectet,(err,decoded)=>{
//                 if(err){

//                 res.send({"status":"some thing wrong"});
//                 }else{
//                     req.decoded=decoded;
//                     next();
//                 }
//             })
//         }else{

//             res.send({"error":"some thing wrong"});}
//         //return res.status(401).send("Token not found")
//     }},

//       setUser(id, user) {

//         return jwt.sign({ 
//         email:user.body.email},sectet)
//      // sessionIdToUserMap.set(id, user);
//     }
// };
// module.exports=Sevice;
import jwt from "jsonwebtoken";


export default function authMiddleware(req, res, next) {
    const authorization = req.headers['authorization']

    if (!authorization) return res.status(401).send("auth token not found")
    const token = authorization.split(' ')[1]
    if (!token) return res.status(401).send("Invalid token")

    jwt.verify(token, sectet, (err, decoded) => {
        if (err) return res.send({ message:"Invalid token" });
        req.user = decoded;
        console.log({decoded})
        return next();
    })
}

