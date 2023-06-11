import express from "express"
import { 
    createBookingCtr 
} from "../controller/bookingController.js";

const bookingRoute = express.Router();

//create user
bookingRoute.post("/book",createBookingCtr)



export default bookingRoute;