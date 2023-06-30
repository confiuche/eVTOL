import express from "express"
import { isLogin } from '../middlewears/isLogin.js'
import { 
    createBookingCtr, searchForEvtolAndPrice 
} from "../controller/bookingController.js";
import multer from 'multer';
import storage from '../config/cloudinary.js'

const upload = multer({storage});

const bookingRoute = express.Router();

//model search
bookingRoute.post("/search-for-eVTOL-model-and-price",isLogin,searchForEvtolAndPrice)
//create user
bookingRoute.post("/book/:id",isLogin,upload.single("medicImage"),createBookingCtr);



export default bookingRoute;