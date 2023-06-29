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
            required:true
        },
        weight:{
            type:Number,
            required:true,
        },
        battery:{
            type:String,
        },
        amount:{
            type:Number,
            enum:[10000, 27823, 33245, 48625, 56897]
        },
        model:{
            type:String,
            enum:["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"],
            //default:"Bronze",
        },
    }
)

const eVTOL = mongoose.model("eVTOL",evtolSchema);
export default eVTOL;