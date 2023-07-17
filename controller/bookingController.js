import User from "../model/userModel.js";
import Booking from "../model/bookingModel.js"
import AppError from "../utils/AppErr.js";
import Location from "../model/locationModel.js";


export const searchForEvtolAndPrice = async(req,res,next) => {
    const { pickUpLocation,destination,date,battery } = req.body
    const model = "Middleweight"
    const amount = 27823

    if(battery <= "25%"){
        next(AppError("Sorry we cant load you because the battery is low",601))
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
    if(weight > 500){
        next(AppError("Weight must not be greater down 500",400))
    }
    try {
        const searchId = req.params.id

        const eSearch = await Booking.findById(searchId)

        if(!eSearch){
            return next(AppError("Sorry evtol model is not found",404))
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

//display all booked
export const displayAllBookedCtr = async (req, res, next) => {
    try {
        const displayAllBooked = await Booking.find({})

        res.json({
            status:"SUCCESS",
            data:displayAllBooked
        })
    } catch (error) {
        next(AppError(error.message))
    }
}



export const loadingCtr = async (req, res, next) => {
    //usg56st6w  649d9276b8cdda67b9a0d07c
    //fjhhf784  649ff1d38cd927217a69aa3a
    //trackingCode
    //hugftr54x
    try { 

        //const displayAll = await Booking.find({})
        

        const dispatchId = req.params
        //const tracking = Booking.findById({id})
        //console.log(tracking);
        const loggedUser = req.userAuth
       // const state = ["LOADING","LOADED","DELIVERING","DELIVERED","RETURNING"]

        //const trackId = await Booking.findOne({trackingCode:mongoose.Types.trackingCode, user:loggedUser, })
        const trackId = await Booking.findOne(dispatchId)
        //const statusInfo = await Booking.findOne(state)
//console.log(state);
        
          if(!trackId){
              return next(AppError("Tracking code not found. Either your tracking code is invalid or evtol not booked",404))
           }//else if(statusInfo){
        //     return next(AppError("Sorry, you can not perform this task"))
        //   }
          

          const dispatchLoading = await Booking.findOneAndUpdate(
              dispatchId,
              {
              status:"LOADING"
         },
          {
              new: true,
          }
         )
        res.json({
            status:"SUCCESS",
            data:dispatchLoading
            //data:"Good work"
            //data:trackId
            //data:displayAll
        })
    } catch (error) {
        next(AppError(error.message))
    }
}



export const loadedCtr = async (req, res, next) => {
    //usg56st6w  649d9276b8cdda67b9a0d07c
    //fjhhf784  649ff1d38cd927217a69aa3a
    //trackingCode
    try { 
        const dispatchId = req.params
        const loggedUser = req.userAuth

        const trackId = await Booking.findOne(dispatchId)
        

          if(!trackId){
              return next(AppError("Tracking code not found. Either your tracking code is invalid or evtol not booked",404))
          }//else if("LOADED"||"DELIVERING"||"DELIVERED"||"RETURNING"){
            //return next(AppError("Sorry, you can not perform this task"))
          //}



          const dispatchLoaded = await Booking.findOneAndUpdate(
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
        //usg56st6w  649d9276b8cdda67b9a0d07c
        //fjhhf784  649ff1d38cd927217a69aa3a
        //trackingCode
        try { 
            const dispatchId = req.params
            const loggedUser = req.userAuth
    
            const trackId = await Booking.findOne(dispatchId)
            
    const statusInfo = ["LOADING","DELIVERED","RETURNING"]
              if(!trackId){
                  return next(AppError("Tracking code not found. Either your tracking code is invalid or evtol not booked",404))
              }else if(!statusInfo){
                return next(AppError("Sorry, you can not perform this task"))
              }
    
    
    
              const dispatchDelivering = await Booking.findOneAndUpdate(
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
        //usg56st6w  649d9276b8cdda67b9a0d07c
        //fjhhf784  649ff1d38cd927217a69aa3a
        //trackingCode
        try { 
            const dispatchId = req.params
            const loggedUser = req.userAuth
    
            const trackId = await Booking.findOne(dispatchId)
            
    
              if(!trackId){
                  return next(AppError("Tracking code not found. Either your tracking code is invalid or evtol not booked",404))
              }//else if("RETURNING"){
                //return next(AppError("Sorry, you can not perform this task"))
              //}
    
    
    
              const dispatchDelivered = await Booking.findOneAndUpdate(
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
        //usg56st6w  649d9276b8cdda67b9a0d07c
        //fjhhf784  649ff1d38cd927217a69aa3a
        //trackingCode
        try { 
            const dispatchId = req.params
            const loggedUser = req.userAuth
            //const state = ["IDLE","LOADING","LOADED","DELIVERING","RETURNING"]
    
            const state = "DELIVERED"
            const trackId = await Booking.findOne(dispatchId)
            const statusInfo = await Booking.findOne(state.status)
            console.log(statusInfo);
    
              if(!trackId){
                  return next(AppError("Tracking code not found. Either your tracking code is invalid or evtol not booked",404))
               }
                if(statusInfo === "DELIVERED"){
                 return next(AppError("blablabla"))
               }
              
    
    
    
              const dispatchReturning = await Booking.findOneAndUpdate(
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


