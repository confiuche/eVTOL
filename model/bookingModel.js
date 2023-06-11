import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
    nameOfMedication:{
        type:String,
        required:[true,"medication name is required"],
        trim:true
    },
    weight:{
        type:String,
        required:[true,"weight is required"]
    },
    dimension:{
        type:String,
        required:[true]
    },
    code:{
        type:String,
        required:[true,"code is required"],
    },
    PickUp:{
        type:String,
        required:[true]
    },
    Destination:{
        type:String,
        required:[true]
    },
    image:{
        type:String,
        required:[true,"image is required"],
    },
    status:{
        type:String,
        default:IDLE
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please author is required"],
    },
    dispatchs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Dispatch",
        required:[true]
    },
},
{
    timestamps:true,
    toJSON:{virtuals:true}
}
);

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking