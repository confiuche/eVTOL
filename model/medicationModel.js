import mongoose, { Schema } from "mongoose";

const medicSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,"medication name is required"],
        trim:true
    },
    weight:{
        type:String,
        required:[true,"weight is required"]
    },
    code:{
        type:String,
        required:[true,"code is required"],
    },
    image:{
        type:String,
        required:[true,"image is required"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please author is required"],
    },
},
{
    timestamps:true,
    toJSON:{virtuals:true}
}
);

const Medic = mongoose.model("Medic", medicSchema)
export default Medic