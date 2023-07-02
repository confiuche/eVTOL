import User from "../model/userModel.js";
import Booking from "../model/bookingModel.js"
import AppError from "../utils/AppErr.js";
import Dispatch from "../model/dispatchModel.js";
import mongoose from "mongoose";


export const displayAllBookedCtr = async (req, res, next) => {
    try {
        const displayAllBooked = await Booking.find({}).populate("user")

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
    try { 

        //const displayAll = await Booking.find({})
        

        const dispatchId = req.params
        //const tracking = Booking.findById({id})
        //console.log(tracking);
        const loggedUser = req.userAuth

        //const trackId = await Booking.findOne({trackingCode:mongoose.Types.trackingCode, user:loggedUser, })
        const trackId = await Booking.findOne(dispatchId)
        

        // if(dispatchId === trackId){
        //     console.log("Correct");
        // }else{
        //     console.log("Incorrect");
        // }

          if(!trackId){
              return next(AppError("Sorry evtol model is not found"))
          }

          const statusInfo = await Booking.f

          if(_status === "RETURNING"){
            next(AppError("hfgfgfgfgfg"));
          }

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
              return next(AppError("Sorry evtol model is not found"))
          }



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
            
    
              if(!trackId){
                  return next(AppError("Sorry evtol model is not found"))
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
                  return next(AppError("Sorry evtol model is not found"))
              }
    
    
    
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
    
            const trackId = await Booking.findOne(dispatchId)
            
    
              if(!trackId){
                  return next(AppError("Sorry evtol model is not found"))
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