import mongoose, { Schema } from "mongoose";

const evtolSchema = new mongoose.Schema(
    {
        bookings:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Booking",
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true,
        },
        location:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Location",
            require:true,
        },
        pickUpLocation:{
            type:String,
            required:[true]
        },
        destination:{
            type:String,
            required:[true]
        },
        date:{
            type:Date,
        },
        weight:{
            type:Number,
            required:true,
        },
        model:{
            type:String,
        },
        battery:{
            type:String,
        },
        amount:{
            type:Number
        }
    }
)

const eVTOL = mongoose.model("eVTOL",evtolSchema);
export default eVTOL;