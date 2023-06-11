import express from "express"
import {
     createUserCtr, 
     profileCtr, 
     userLoginCtr 
    } from "../controller/userController.js";
import { isLogin } from "../middlewears/isLogin.js";

const userRoute = express.Router();

//create user
userRoute.post("/create",createUserCtr);
userRoute.post("/login", userLoginCtr);
userRoute.get("/profile",isLogin, profileCtr);



export default userRoute;