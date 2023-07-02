import express from "express"
import { isLogin } from "../middlewears/isLogin.js"
//import { isAdmin } from "../middlewears/isAdmin.js";
import { isDispatch } from "../middlewears/isDispatch.js";
import { 
    deliveredCtr,
    deliveringCtr,
    displayAllBookedCtr,
    loadedCtr, 
    loadingCtr, 
    returningCtr
} from "../controller/dispatchCtr.js";


const dispatchRoute = express.Router();

dispatchRoute.get("/all-booked",isLogin, isDispatch, displayAllBookedCtr)
dispatchRoute.post("/Loading/:trackingCode",isLogin,isDispatch,loadingCtr)
dispatchRoute.post("/Loaded/:trackingCode",isLogin,isDispatch,loadedCtr)
dispatchRoute.post("/Delivering/:trackingCode",isLogin,isDispatch,deliveringCtr)
dispatchRoute.post("/Delivered/:trackingCode",isLogin,isDispatch,deliveredCtr)
dispatchRoute.post("/Returning/:trackingCode",isLogin,isDispatch,returningCtr)


export default dispatchRoute