import express from "express"
import {
     createUserCtr, 
     forgetPasswordCtr, 
     passwordSettingCtr, 
     profileCtr, 
     resetPasswordCtr, 
     userLoginCtr 
    } from "../controller/userController.js";
import { isLogin } from "../middlewears/isLogin.js";
import { isAdmin } from "../middlewears/isAdmin.js";
import { isDispatch } from "../middlewears/isDispatch.js";


const userRoute = express.Router();

//create user
userRoute.post("/create",createUserCtr);
userRoute.post("/login", userLoginCtr);
userRoute.get("/profile",isLogin, profileCtr);
//forget password
userRoute.post("/forget-password", forgetPasswordCtr)
//reset password
userRoute.post("/reset-password", resetPasswordCtr)
//password setting
userRoute.put("/security",isLogin, passwordSettingCtr)
//display all user by admin



export default userRoute;