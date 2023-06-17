import mongoose, { Schema } from "mongoose";

const locationSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true,
        },
        location:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true,
    }
)

const Location = mongoose.model("Location",locationSchema);
export default Location;