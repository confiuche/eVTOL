import User from "../model/userModel.js";
import Booking from "../model/bookingModel.js"
import AppError from "../utils/AppErr.js";
import Dispatch from "../model/dispatchModel.js";


export const loadedCtr = async (req, res, next) => {
    try {
        const dispatchId = req.params.id

        const dispTCH = await Booking.findById(dispatchId)

        if(!dispTCH){
            return next(AppError("Sorry evtol model is not found"))
        }



        const dispatchEvtolBooking = await Booking.findByIdAndUpdate(
            dispatchId,
            {
            status:"LOADED"
        },
        {
            new: true,
        }
        )
        res.json({
            status:"SUCCESS",
            data:dispatchEvtolBooking
        })
    } catch (error) {
        next(AppError(error.message))
    }
}