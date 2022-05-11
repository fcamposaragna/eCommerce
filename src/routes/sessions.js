import express from "express";
import jwt from 'jsonwebtoken';

import uploader from '../utils/uploader.js'
import { passportCall } from "../middlewares/passportMiddlewares.js";
import config from '../config/config.js';
import { sendEmail, sendEmailConfirmation } from '../utils/nodemailer.js'
import { serialize } from '../utils.js'


const router = express.Router();

router.get('/current',passportCall('jwt'),(req,res)=>{
    let user = serialize(req.user,["first_name","last_name","role","profile_picture","cart"])
    res.send({status:"success",payload:user});
})

router.post('/register',uploader.single('profilePic'),passportCall('register'),(req,res)=>{
    const user = req.user
    sendEmail(user)
    res.send({status:'success', message:"Signed up"})
})
router.post('/login',passportCall('login'),(req,res)=>{
    let user;
    if(req.user.role!=='superadmin'){
        //user= serialize(req.user,['first_name', 'last_name'])
        // let result = new UserDTO(req.user);
        // let {first_name,last_name,profile_picture,cart, role} = result
        // user = {
        //     first_name,
        //     last_name,
        //     profile_picture,
        //     cart,
        //     role
        // }
        user = req.user;
    }else{
        user = req.user;
    }
    let token = jwt.sign(user,config.jwt.SECRET)
    res.cookie(config.jwt.COOKIE_NAME,token,{
        httpOnly:true,
        maxAge:60*60*1000
    })
    res.cookie('sessionCookie','boom',{
        maxAge:60*60*1000
    })
    res.send({status:"success",payload:{user}});
})

export default router;