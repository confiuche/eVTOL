import express from "express"
import { isLogin } from "../middlewears/isLogin.js"
//import { isAdmin } from "../middlewears/isAdmin.js";
import { isDispatch } from "../middlewears/isDispatch.js";


const dispatchRoute = express.Router();





export default dispatchRoute