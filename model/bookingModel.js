import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
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
    },
    nameOfMedication:{
        type:String,
        //required:[true,"medication name is required"],
        trim:true
    },
    weight:{
        type:String,
        //required:[true,"weight is required"]
    },
    trackingCode:{
        type:String,
        //required:[true,"code is required"],
    },
    image:{
        type:String,
        //required:[true,"image is required"],
    },
    status:{
        type:String,
        enum:["IDLE","LOADING","LOADED","DELIVERING","DELIVERED","RETURNING"],
        default:"IDLE"
    },
    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Location",
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please author is required"],
    },
    dispatchs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Dispatch",
        //required:[true]
     },
},
{
    timestamps:true,
    toJSON:{virtuals:true}
}
);

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking