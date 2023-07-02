import User from "../model/userModel.js";
import Booking from "../model/bookingModel.js"
import AppError from "../utils/AppErr.js";
import Location from "../model/locationModel.js";


export const searchForEvtolAndPrice = async(req,res,next) => {
    const { pickUpLocation,destination,date,battery } = req.body
    const model = "Middleweight"
    const amount = 27823

    if(battery <= "25%"){
        next(AppError("Sorry we cant load you because the battery is low"))
    }
    try {
        const user = await User.findById(req.userAuth)

        const createSearch = await Booking.create({
            pickUpLocation,
            destination,
            date,
            model,
            battery,
            amount,
            user:user._id
        })

        res.json({
            status:"SUCCESS",
            data:createSearch
        })
    } catch (error) {
        next(AppError(error.message))
    }
}



export const createBookingCtr = async (req, res, next) => {
    const {nameOfMedication,weight,trackingCode} = req.body;
    try {
        const searchId = req.params.id

        const eSearch = await Booking.findById(searchId)

        if(!eSearch){
            return next(AppError("Sorry evtol model is not found"))
        }



        const createBooking = await Booking.findByIdAndUpdate(
            searchId,
            {
            nameOfMedication,
            weight,
            trackingCode,
            status:"IDLE",
            image: req?.file?.path,
        },
        {
            new: true,
        }
        )
        res.json({
            status:"SUCCESS",
            data:createBooking
        })
    } catch (error) {
        next(AppError(error.message))
    }
}

export const displayBooking = async (req, res, next) => {
    try {
        res.json({
            status:"SUCCESS",
            data:""
        })
    } catch (error) {
        next(AppError(error.message))
    }
}