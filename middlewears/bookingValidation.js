import joi from 'joi'
import Booking from '../model/bookingModel.js'


export const validateBooking = async(req,res,next) => {
    const Schema = joi.object({
        nameOfMedication:joi.string().min(2).required(),
        weight:joi.number(),
        dimension:joi.number(),
        image:joi.string().email(),
        trackingCode:joi.string().min(3)
        PickUpLocation:
        Destination:
    })

    const validateResult = Schema.validate(req.body);

    if(validateResult.error){
        return res.status(400).json(validateResult.error.message)
    }
    next()
}