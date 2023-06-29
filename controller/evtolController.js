import User from "../model/userModel.js";
import Booking from "../model/bookingModel.js"
import AppError from "../utils/AppErr.js";
import eVTOL from "../model/evtolModel.js";
import Location from "../model/locationModel.js";



export const searchForEvtolAndPrice = async(req,res,next) => {
    const { pickUpLocation,destination,date,weight,battery } = req.body
    const model = "Middleweight"
    const amount = 27823

    if(battery === "25%"){
        next(AppError("Sorry we cant load you because the battery is low"))
    }
    try {
        const user = await User.findById(req.userAuth)

        const createSearch = await eVTOL.create({
            pickUpLocation,
            destination,
            date,
            weight,
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