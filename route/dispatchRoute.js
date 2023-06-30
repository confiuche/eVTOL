import express from "express"
import { isLogin } from "../middlewears/isLogin.js"
//import { isAdmin } from "../middlewears/isAdmin.js";
import { isDispatch } from "../middlewears/isDispatch.js";
import { 
    loadedCtr 
} from "../controller/dispatchCtr.js";


const dispatchRoute = express.Router();

dispatchRoute.post("/dispatch/:id",isLogin,isDispatch,loadedCtr)

export default dispatchRoute