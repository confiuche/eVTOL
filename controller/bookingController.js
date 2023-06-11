import User from "../model/userModel.js";
import Booking from "../model/bookingModel.js"
import AppError from "../utils/AppErr.js";

export const createBookingCtr = async (req, res, next) => {
    const {nameOfMedication,weight,dimension,bookingCode,PickUpLocation,Destination} = req.body;
    try {
        const createBooking = await Booking.create({
            nameOfMedication,
            weight,
            dimension,
            bookingCode,
            PickUpLocation,
            Destination
        })
        res.json({
            status:"SUCCESS",
            data:createBooking
        })
    } catch (error) {
        next(AppError(error.message))
    }
}