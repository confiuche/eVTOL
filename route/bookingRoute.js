import express from "express"
import { isLogin } from '../middlewears/isLogin.js'
import { 
    createBookingCtr, 
    deliveredCtr, 
    deliveringCtr, 
    displayAllBookedCtr, 
    loadedCtr, 
    loadingCtr, 
    returningCtr, 
    searchForEvtolAndPrice 
} from "../controller/bookingController.js";
import multer from 'multer';
import storage from '../config/cloudinary.js'
import { isDispatch } from "../middlewears/isDispatch.js";

const upload = multer({storage});

const bookingRoute = express.Router();

//model search
bookingRoute.post("/search-for-eVTOL-model-and-price",isLogin,searchForEvtolAndPrice)
//create user
bookingRoute.post("/book/:id",isLogin,upload.single("medicImage"),createBookingCtr);
//display all booking
bookingRoute.get("/all-booked",isLogin, isDispatch, displayAllBookedCtr)
//Loading state
bookingRoute.post("/dispatch/Loading/:trackingCode",isLogin,isDispatch,loadingCtr)
//Loaded state
bookingRoute.post("/dispatch/Loaded/:trackingCode",isLogin,isDispatch,loadedCtr)
//Delivering state
bookingRoute.post("/dispatch/Delivering/:trackingCode",isLogin,isDispatch,deliveringCtr)
//Delivered state
bookingRoute.post("/dispatch/Delivered/:trackingCode",isLogin,isDispatch,deliveredCtr)
//Returning state
bookingRoute.post("/dispatch/Returning/:trackingCode",isLogin,isDispatch,returningCtr)



export default bookingRoute;