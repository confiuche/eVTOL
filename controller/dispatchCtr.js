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



        const dispatchLoaded = await Booking.findByIdAndUpdate(
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
            data:dispatchLoaded
        })
    } catch (error) {
        next(AppError(error.message))
    }
}


export const deliveringCtr = async (req, res, next) => {
    try {
        const dispatchId = req.params.id

        const dispTCH = await Booking.findById(dispatchId)

        if(!dispTCH){
            return next(AppError("Sorry evtol model is not found"))
        }



        const dispatchDelivering = await Booking.findByIdAndUpdate(
            dispatchId,
            {
            status:"DELIVERING"
        },
        {
            new: true,
        }
        )
        res.json({
            status:"SUCCESS",
            data:dispatchDelivering
        })
    } catch (error) {
        next(AppError(error.message))
    }
}



export const deliveredCtr = async (req, res, next) => {
    try {
        const dispatchId = req.params.id

        const dispTCH = await Booking.findById(dispatchId);

        if(!dispTCH){
            return next(AppError("Sorry evtol model is not found"))
        }



        const dispatchDelivered = await Booking.findByIdAndUpdate(
            dispatchId,
            {
            status:"DELIVERED"
        },
        {
            new: true,
        }
        )
        res.json({
            status:"SUCCESS",
            data:dispatchDelivered
        })
    } catch (error) {
        next(AppError(error.message))
    }
}



export const returningCtr = async (req, res, next) => {
    try {
        const dispatchId = req.params.id

        const dispTCH = await Booking.findById(dispatchId)

        if(!dispTCH){
            return next(AppError("Sorry evtol model is not found"))
        }



        const dispatchReturning = await Booking.findByIdAndUpdate(
            dispatchId,
            {
            status:"RETURNING"
        },
        {
            new: true,
        }
        )
        res.json({
            status:"SUCCESS",
            data:dispatchReturning
        })
    } catch (error) {
        next(AppError(error.message))
    }
}