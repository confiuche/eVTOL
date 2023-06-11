import express from "express"
import {
     createUserCtr, 
     userLoginCtr 
    } from "../controller/userController.js";

const userRoute = express.Router();

//create user
userRoute.post("/create",createUserCtr);
userRoute.post("/login", userLoginCtr);



export default userRoute;