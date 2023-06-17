import express from "express"
import { isLogin } from "../middlewears/isLogin.js"
import { isAdmin } from "../middlewears/isAdmin.js";
import { 
    createLocationCtr 
} from '../controller/locationController.js';


const locationRoute = express.Router();

locationRoute.post("",isLogin,isAdmin, createLocationCtr)

export default locationRoute