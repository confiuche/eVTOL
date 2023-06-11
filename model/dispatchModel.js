import mongoose, { Schema } from "mongoose";

const dispatchSchema = new mongoose.Schema(
    {
        bookings:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Booking",
            required:[true]
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:[true]
        },
    },
    {
        timestamps:true
    }
);
const Dispatch = mongoose.model("Dispatch", dispatchSchema);
export default Dispatch;