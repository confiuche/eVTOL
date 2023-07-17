import express from "express"
import {
    createPayment,
     createUserCtr, 
     displayUserByAdminCtr, 
     forgetPasswordCtr, 
     getPayment, 
     passwordSettingCtr, 
     profileCtr, 
     profilePhotoUploadCtrl, 
     resetPasswordCtr, 
     startPayment, 
     userLoginCtr 
    } from "../controller/userController.js";
import { isLogin } from "../middlewears/isLogin.js";
import { isAdmin } from "../middlewears/isAdmin.js";
import { isDispatch } from "../middlewears/isDispatch.js";
import { validateUser } from "../middlewears/userValidation.js";
import multer from 'multer';
import storage from '../config/cloudinary.js'


const userRoute = express.Router();
const upload = multer({storage})

//create user
userRoute.post("/create",validateUser,createUserCtr);
//user login
userRoute.post("/login", userLoginCtr);
//upload profile
userRoute.post("/profile-image",isLogin,upload.single("profile"),profilePhotoUploadCtrl)
//user profile
userRoute.get("/profile",isLogin, profileCtr);
//forget password
userRoute.post("/forget-password", forgetPasswordCtr)
//reset password
userRoute.post("/reset-password", resetPasswordCtr)
//password setting
userRoute.put("/security",isLogin, passwordSettingCtr)
//display all user by admin
userRoute.get("/display-all-by-admin",isLogin,isAdmin,displayUserByAdminCtr)
//paystack
userRoute.post('/', isLogin, startPayment);
userRoute.get('/createPayment', isLogin, createPayment);
userRoute.get('/paymentDetails', isLogin, getPayment);


export default userRoute;